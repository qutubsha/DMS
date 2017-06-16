using DMS.Abstraction;
using DMS.Abstraction.DocumentAccessHistories;
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
            List<DocumentAccessHistory> docAccessHistory = _context.AccessHistory.Find(filter).ToList();
            foreach (DocumentAccessHistory history in docAccessHistory)
            {
                User performedByUser = (history.PerformedBy > 0) ? _context.Users.AsQueryable().Where(x => x.UserId.Equals(history.PerformedBy)).FirstOrDefault() : null;      
                history.PerformedByName = (performedByUser != null) ? string.Join(" ", performedByUser.FirstName, performedByUser.LastName) : string.Empty; 
            }
            return docAccessHistory;
        }

        public async Task InsertDocumentAccessLog(DocumentAccessHistory documentAccessHistory)
        {
            await _context.AccessHistory.InsertOneAsync(documentAccessHistory);
        }

    }
}
