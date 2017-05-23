using DMS.Abstraction;
using DMS.Abstraction.Documents;
using Microsoft.Extensions.Options;
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

        //Task<Document> AddDocument(Document document, byte[] file);

        //Task<Document> GetDocument(string loginId, string documentId, string versionId = null, string revisionId = null);

        //Task<int> DeleteDocument(string documentId, string loginId);

        //Task<Document> CheckOutDocument(string documentId, string loginId);

        //Task CheckInDocument(Document document, byte[] file);

        //Task<List<Document>> GetAllDocuments(bool IsShared, string loginId);
    }
}
