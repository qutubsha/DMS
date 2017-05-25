using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction.Documents
{
    public interface IDocumentService
    {
        Task AddDocument(Document document, byte[] file);

        //Task<Document> GetDocument(string loginId, string documentId,int isShared,string versionId = null, string revisionId =null);

        Task<DeleteResult> DeleteDocument(int documentId, int loginId);

        //Task<Document> CheckOutDocument(string documentId, string loginId);

        //Task CheckInDocument(Document document, byte[] file);

        Task<List<Document>> GetAllDocuments(bool IsShared, int loginId);
    }
}