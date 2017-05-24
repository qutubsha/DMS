using DMS.Abstraction.DocumentAccessHistory;
using DMS.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS
{
    public class DocumentAccessHistoryService : IDocumentAccessHistoryService
    {
        private IDocumentAccessHistoryRepository _repository;

        /// <summary>
        /// Setting private ICompanyRepository variable
        /// </summary>
        /// <param name="repository"></param>
        public DocumentAccessHistoryService(IDocumentAccessHistoryRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<DocumentAccessHistory>> GetDocumentAccessHistory(int documentId)
        {
            return await _repository.GetDocumentAccessHistory(documentId);
        }

        public async Task InsertDocumentAccessLog(DocumentAccessHistory documentAccessHistory)
        {
            // Throws null exception if company value is null
            if (documentAccessHistory == null)
                throw new ArgumentNullException(nameof(documentAccessHistory), "Document Access History should not be null");

            // returns new company with DepartmentId
            await _repository.InsertDocumentAccessLog(documentAccessHistory);
        }
    }
}
