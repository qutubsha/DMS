﻿using DMS.Abstraction.Revisions;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction.Documents
{
    public interface IDocumentRepository
    {
        Task AddDocument(Document document, byte[] file);

        //Task<Document> GetDocument(string loginId, string documentId, int isShared,string versionId = null, string revisionId =null);

        Task<Document> DeleteDocument(int documentId, int loginId);

        Task<Document> CheckOutDocument(int documentId, int loginId);

        Task<Document> CheckInDocument(int documentId, string why, string what,
                                        bool isNewRevision, byte[] file,
                                        string fileName, string extension, int loginId);

        Task<List<Document>> GetAllDocuments(bool IsShared, int loginId);

        Task<List<Revision>> GetVersionDetails(int IsShared, int loginId);

        Task<Document> GetDocumentById(int documentId, int loginId);
    }
}