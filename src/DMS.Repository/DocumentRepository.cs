using DMS.Abstraction;
using DMS.Abstraction.Documents;
using DMS.Abstraction.Revisions;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Repository
{
    public class DocumentRepository : IDocumentRepository
    {
        private readonly DMSContext _context = null;

        public DocumentRepository(IOptions<Settings> settings)
        {
            _context = new DMSContext(settings);
        }

        public async Task AddDocument(Document document, byte[] file)
        {
            await _context.Documents.InsertOneAsync(document);
        }

        //Task<Document> GetDocument(string loginId, string documentId, string versionId = null, string revisionId = null)
        //{

        //}

        public async Task<DeleteResult> DeleteDocument(int documentId, int loginId)
        {
            //TODO : Check if user is allowed to delete document
            var filter = Builders<Document>.Filter.Eq("DocumentId", documentId);
            return await _context.Documents.DeleteOneAsync(filter);
        }

        public async Task<Document> CheckOutDocument(int documentId, int loginId)
        {
            var filter = Builders<Document>.Filter.Eq("DocumentId", documentId);
            Document document = await _context.Documents.Find(filter).FirstOrDefaultAsync();
            if(document != null)
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
                //TODO : check permission if user is allowed to check in document and document is check out by same user or not
                
                // check if document is checked out or not
                if (document.LockedBy == loginId)
                {
                    //Enter revision detailin revision table
                    Revision revision = new Revision();
                    revision.DocumentId = documentId;
                    revision.FileName = fileName;
                    revision.Extension = extension;
                    revision.ModifiedBy = loginId;
                    //revision.ModifiedOn = passdate
                    if (isNewRevision)
                    {
                        revision.RevisionId = document.CurrentRevision + 1;
                        revision.VersionId = document.CurrentVersion;
                    }
                    else
                    {
                        revision.VersionId = document.CurrentVersion + 1;
                        revision.RevisionId = 1;
                    }
                    //revision.Path = "";
                    revision.What = what;
                    revision.Why = why;
                    //revision.size

                    await _context.Revisions.InsertOneAsync(revision);

                    //Update document table accordingly
                    var update = Builders<Document>.Update.Set(s => s.FileName, fileName)
                                                      .Set(s => s.Extension, extension)
                                                      .Set(s => s.CurrentRevision, revision.RevisionId)
                                                      .Set(s => s.CurrentVersion, revision.VersionId)
                                                      .Set(s => s.LockedBy, null);
                   
                    await _context.Documents.UpdateOneAsync(filter, update);
                }
            }
            return document;
        }

        public async Task<List<Document>> GetAllDocuments(bool IsShared, int loginId)
        {
            //TODO : Get documents on which user has rights
            var filter = Builders<Document>.Filter.Eq("IsShared", IsShared);
            return  await _context.Documents.Find(filter).ToListAsync();
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
    }
}
