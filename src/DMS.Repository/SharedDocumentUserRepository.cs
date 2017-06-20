using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DMS.Abstraction;
using DMS.Abstraction.SharedDocumentUsers;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace DMS.Repository
{
    public class SharedDocumentUserRepository : ISharedDocumentUserRepository
    {
        private readonly DMSContext _context = null;

        public SharedDocumentUserRepository(IOptions<Settings> settings)
        {
            _context = new DMSContext(settings);
        }
        public List<SharedDocumentsViewModel> GetDocumentsSharedByMe(int loggedInUserId)
        {
            List<SharedDocumentsViewModel> sharedDocViewModelList = new List<SharedDocumentsViewModel>();
            ICollection<SharedDocumentUser> sharedDocUsers = _context.SharedDocumentUsers.AsQueryable().ToList();
            foreach (SharedDocumentUser sharedDocUser in sharedDocUsers)
            {
                var filter = Builders<User>.Filter.Eq("UserId", sharedDocUser.UserId);
                string sharedToName = _context.Users.Find(filter).FirstOrDefaultAsync().Result.FirstName;
                List<int> singleUserDocIds = sharedDocUser.SharedDocuments.Where(x => x.SharedBy.Equals(loggedInUserId)).Select(x => x.DocumentId).ToList();
                if (singleUserDocIds.Count > 0)
                {
                    foreach (Document singleDoc in _context.Documents.AsQueryable().Where(x => singleUserDocIds.Contains(x.DocumentId)).ToList())
                    {
                        sharedDocViewModelList.Add(MapDocumentToSharedDocumentViewModel(singleDoc, "", sharedToName));
                    }
                }
            }
            return sharedDocViewModelList;
        }

        public List<SharedDocumentsViewModel> GetDocumentsSharedWithMe(int loggedInUserId)
        {
            List<SharedDocumentsViewModel> sharedDocViewModelList = new List<SharedDocumentsViewModel>();
            SharedDocumentUser sharedDocsWithMe = _context.SharedDocumentUsers.AsQueryable().FirstOrDefault(x => x.UserId.Equals(loggedInUserId));
            if (sharedDocsWithMe != null)
            {
                List<Document> docList = new List<Document>();
                foreach (SharedDocument sharedDoc in sharedDocsWithMe.SharedDocuments.ToList())
                {
                    var filter = Builders<User>.Filter.Eq("UserId", sharedDoc.SharedBy);
                    string sharedByName = _context.Users.Find(filter).FirstOrDefaultAsync().Result.FirstName;
                    sharedDocViewModelList.Add(MapDocumentToSharedDocumentViewModel(_context.Documents.AsQueryable().FirstOrDefault(x => x.DocumentId.Equals(sharedDoc.DocumentId)), sharedByName, string.Empty));
                }
            }
            return sharedDocViewModelList;
        }

        public ISharedDocumentUser ShareDocument(SharedDocumentUser sharedDocUser, int loggedInUserId)
        {
            throw new NotImplementedException();
        }

        #region Private Methods

        private SharedDocumentsViewModel MapDocumentToSharedDocumentViewModel(Document doc, string SharedByName, string SharedToName)
        {
            return new SharedDocumentsViewModel
            {
                CreatedByName = doc.CreatedByName,
                CreatedOn = doc.CreatedOn,
                CurrentRevision = doc.CurrentRevision,
                CurrentVersion = doc.CurrentVersion,
                DeletedBy = doc.DeletedBy,
                DeletedOn = doc.DeletedOn,
                DocumentData = doc.DocumentData,
                DocumentId = doc.DocumentId,
                DocumentTags = doc.DocumentTags,
                Extension = doc.Extension,
                FileName = doc.FileName,
                LockedByName = doc.LockedByName,
                IsDeleted = doc.IsDeleted,
                IsShared = doc.IsShared,
                ModifiedBy = doc.ModifiedBy,
                ModifiedOn = doc.ModifiedOn,
                SharedByName = ((!string.IsNullOrEmpty(SharedByName)) ? SharedByName : string.Empty),
                SharedToName = ((!string.IsNullOrEmpty(SharedToName)) ? SharedToName : string.Empty)
            };
        }
        #endregion
    }
}
