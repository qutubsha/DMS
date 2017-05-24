using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks; 

namespace DMS.Abstraction.DocumentAccessHistory
{
    public interface IDocumentAccessHistoryRepository
    {
        Task<List<DocumentAccessHistory>> GetDocumentAccessHistory(int documentId);
    }
}
