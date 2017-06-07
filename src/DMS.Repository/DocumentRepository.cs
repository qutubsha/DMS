using DMS.Abstraction;
using DMS.Abstraction.Documents;
using DMS.Abstraction.Revisions;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DMS.Repository
{
    public class DocumentRepository : IDocumentRepository
    {
        private readonly DMSContext _context = null;
        public static string fileUploadPath;

        public DocumentRepository(IOptions<Settings> settings)
        {
            _context = new DMSContext(settings);
            fileUploadPath = settings.Value.FileUploadPath;
        }

        public async Task AddDocument(Document document, byte[] file)
        {
            if (document == null) { throw new ArgumentNullException(nameof(document), "document should not be null."); }
            var maxDocId = _context.Documents.AsQueryable().Max(p => p.DocumentId);

            var newDoc = new Document()
            {
                DocumentId = ++maxDocId,
                CreatedBy = document.CreatedBy,
                CurrentRevision = document.CurrentRevision,
                CurrentVersion = document.CurrentVersion,
                DeletedBy = document.DeletedBy,
                DeletedOn = document.DeletedOn,
                DocumentData = document.DocumentData,
                DocumentTags = document.DocumentTags,
                Extension = document.Extension,
                FileName = document.FileName,
                IsDeleted = document.IsDeleted,
                IsShared = document.IsShared,
                LockedBy = document.LockedBy,
                ModifiedBy = document.ModifiedBy
            };

            //TODO Check permission, validate request, save file, add transaction, set identity and use it
            await _context.Documents.InsertOneAsync(newDoc);
            string filePath = CreateDocumentPath(fileUploadPath, maxDocId, document.CurrentVersion,
                            document.CurrentRevision, document.Extension);
            //TODO : check if filepath is null
            Revision revision = CreateRevision(maxDocId, document.FileName, document.Extension,
                    document.CreatedBy, 1, 1, "Created", "Created", filePath);

            // TODO : Save file on this path 
            File.Move(Path.GetTempPath() + "\\" + document.FileName + document.Extension, filePath);
            await _context.Revisions.InsertOneAsync(revision);
        }

        public async Task<Document> DeleteDocument(int documentId, int loginId)
        {
            var filter = Builders<Document>.Filter.Eq("DocumentId", documentId);
            Document document = await _context.Documents.Find(filter).FirstOrDefaultAsync();
            if (document != null)
            {
                //TODO : check permission if user is allowed to delete document

                //Set is deleted flag in database
                var update = Builders<Document>.Update.Set(s => s.IsDeleted, true)
                                                       .Set(s => s.DeletedBy, loginId)
                                                       .Set(s => s.DeletedOn, DateTime.Now);
                await _context.Documents.UpdateOneAsync(filter, update);
            }
            return document;
            //var filter = Builders<Document>.Filter.Eq("DocumentId", documentId);
            //return await _context.Documents.DeleteOneAsync(filter);
        }

        public async Task<Document> CheckOutDocument(int documentId, int loginId)
        {
            var filter = Builders<Document>.Filter.Eq("DocumentId", documentId);
            Document document = await _context.Documents.Find(filter).FirstOrDefaultAsync();
            if (document != null)
            {
                //TODO : check permission if user is allowed to check out document and document is not check out

                // check if document is checked out or not
                if (document.LockedBy == null || document.LockedBy == -2)
                {
                    //Lock document with current user
                    var update = Builders<Document>.Update.Set(s => s.LockedBy, loginId);
                    await _context.Documents.UpdateOneAsync(filter, update);
                }
                //TODO : else Update user that document is already checked out by other user
            }
            return document;
            //TODO : Handle null document
        }

        public async Task<Document> CheckInDocument(int documentId, string why, string what,
                                        bool isNewRevision, byte[] file,
                                        string fileName, string extension, int loginId)
        {
            // TODO : Check edit permission, check if lock by user is current user, save document in repository
            var filter = Builders<Document>.Filter.Eq("DocumentId", documentId);
            Document document = await _context.Documents.Find(filter).FirstOrDefaultAsync();
            if (document != null)
            {
                string basePath = Path.GetTempPath();
                //TODO : check permission if user is allowed to check in document and document is check out by same user or not

                // check if document is checked out or not
                if (document.LockedBy == loginId)
                {
                    //Enter revision detail in revision table
                    int revisionId = 0;
                    int versionId = 0;

                    if (isNewRevision)
                    {
                        revisionId = document.CurrentRevision + 1;
                        versionId = document.CurrentVersion;
                    }
                    else
                    {
                        versionId = document.CurrentVersion + 1;
                        revisionId = 1;
                    }

                    string filePath = CreateDocumentPath(basePath, document.DocumentId, versionId,
                                    revisionId, document.Extension);
                    //TODO : check if filepath is null
                    Revision revision = CreateRevision(documentId, fileName, extension, loginId,
                        revisionId, versionId, what, why, filePath);

                    await _context.Revisions.InsertOneAsync(revision);

                    // TODO : Save file on this path 
                    //Update document table accordingly
                    var update = Builders<Document>.Update.Set(s => s.FileName, fileName)
                                                      .Set(s => s.Extension, extension)
                                                      .Set(s => s.CurrentRevision, revisionId)
                                                      .Set(s => s.CurrentVersion, versionId)
                                                      .Set(s => s.LockedBy, null);

                    await _context.Documents.UpdateOneAsync(filter, update);
                }
            }
            return document;
        }

        public async Task<List<Document>> GetAllDocuments(bool IsShared, int loginId)
        {
            //TODO : Get documents on which user has rights and  are not deleted

            List<Document> doclist = _context.Documents.AsQueryable().Where(x => x.IsShared.Equals(false) && x.IsDeleted.Equals(false)).ToList();
            foreach (Document doc in doclist)
            {
                User createdByUser = (doc.CreatedBy > 0) ? _context.Users.AsQueryable().Where(x => x.UserId.Equals(doc.CreatedBy)).FirstOrDefault() : null;
                User lockedByUser = (doc.LockedBy > 0) ? _context.Users.AsQueryable().Where(x => x.UserId.Equals(doc.LockedBy)).FirstOrDefault() : null;
                doc.CreatedByName = (createdByUser != null) ? string.Join(" ", createdByUser.FirstName, createdByUser.LastName) : string.Empty; //set CreatedByName with CreatedById
                doc.LockedByName = (lockedByUser != null) ? string.Join(" ", lockedByUser.FirstName, lockedByUser.LastName) : string.Empty; //set LockedByName with LockedById
            }
            return doclist;
            //var filter = Builders<Document>.Filter.Eq("IsShared", IsShared);
            //return  await _context.Documents.Find(filter).ToListAsync();
        }

        public async Task<Document> GetDocumentById(int documentId, int loginId)
        {
            //TODO : Get document if user has rights
            var filter = Builders<Document>.Filter.Eq("DocumentId", documentId);
            return await _context.Documents.Find(filter).FirstOrDefaultAsync();
        }

        public async Task<List<Revision>> GetVersionDetails(int documentId, int loginId)
        {
            //TODO : Get documentson which user has rights
            var filter = Builders<Revision>.Filter.Eq("DocumentId", documentId);
            return await _context.Revisions.Find(filter).ToListAsync();
        }

        public async Task<Document> TagDocument(int documentId, int loginId, string tags)
        {
            // TODO : Check permission 
            var filter = Builders<Document>.Filter.Eq("DocumentId", documentId);
            Document document = await _context.Documents.Find(filter).FirstOrDefaultAsync();

            if (document != null)
            {
                var update = Builders<Document>.Update.Set(s => s.DocumentTags, tags);
                await _context.Documents.UpdateOneAsync(filter, update);
            }
            return document;
        }

        private Revision CreateRevision(int documentId, string fileName, string extension, int loginId, int revisionId,
                            int versionId, string what, string why, string path)
        {
            Revision revision = new Revision();
            revision.DocumentId = documentId;
            revision.FileName = fileName;
            revision.Extension = extension;
            revision.ModifiedBy = loginId;
            revision.VersionId = versionId;
            revision.RevisionId = revisionId;
            revision.ModifiedOn = DateTime.Now;
            revision.Path = path;
            revision.What = what;
            revision.Why = why;
            //revision.size

            return revision;
        }

        private string CreateDocumentPath(string basePath, int documentd, int versionId,
                int revisionId, string extension)
        {
            string path = null;
            if (Directory.Exists(basePath))
            {
                path = Path.Combine(basePath, documentd.ToString(), versionId.ToString());

                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                path += Path.DirectorySeparatorChar + revisionId.ToString() + extension;
                //path += Path.DirectorySeparatorChar + revisionId.ToString() + "." + extension;
            }
            return path;
        }
    }
}
