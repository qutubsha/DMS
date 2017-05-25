using DMS.Abstraction;
using DMS.Abstraction.Documents;
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

        //Task<Document> CheckOutDocument(string documentId, string loginId);

        //Task CheckInDocument(Document document, byte[] file);

        public async Task<List<Document>> GetAllDocuments(bool IsShared, int loginId)
        {
            //TODO : Get documentson which user has rights
            var filter = Builders<Document>.Filter.Eq("IsShared", IsShared);
            return  await _context.Documents.Find(filter).ToListAsync();
           // return await _context.Documents.Find(_ => true).ToListAsync();
        }
    }
}
