using DMS.Abstraction;
using DMS.Abstraction.DocumentAccessHistory;
using DMS.Abstraction.Documents;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Repository
{
    public class DocumentAccessHistoryRepository : IDocumentAccessHistoryRepository
    {
        private readonly DMSContext _context = null;

        public DocumentAccessHistoryRepository(IOptions<Settings> settings)
        {
            _context = new DMSContext(settings);
        }
        public async Task<List<DocumentAccessHistory>> GetDocumentAccessHistory(int documentId)
        {
            var filter = Builders<DocumentAccessHistory>.Filter.Eq("DocumentId", documentId);
            return await _context.AccessHistory.Find(filter).ToListAsync();
        }

        public async Task InsertDocumentAccessLog(DocumentAccessHistory documentAccessHistory)
        {
            await _context.AccessHistory.InsertOneAsync(documentAccessHistory);
        }

    }
}
