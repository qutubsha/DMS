﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction.DocumentAccessHistories
{
    public interface IDocumentAccessHistoryService
    {
        Task<List<DocumentAccessHistory>> GetDocumentAccessHistory(int documentId);

        Task InsertDocumentAccessLog(DocumentAccessHistory documentAccessHistory);
    }
}
