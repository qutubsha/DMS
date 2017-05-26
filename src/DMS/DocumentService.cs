using DMS.Abstraction;
using DMS.Abstraction.Documents;
using DMS.Abstraction.Revisions;
//using DMS.Abstraction.Revisions;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS
{
    public class DocumentService : IDocumentService
    {

        private IDocumentRepository _repository;

        /// <summary>
        /// Setting private ICompanyRepository variable
        /// </summary>
        /// <param name="repository"></param>
        public DocumentService(IDocumentRepository repository)
        {
            _repository = repository;
        }


        public async Task AddDocument(Document document, byte[] file)
        {
            if (document == null)
            {
                throw new ArgumentNullException(nameof(document), "Document should not be null");
            }
            await _repository.AddDocument(document, file);
        }

        //Task<Document> GetDocument(string loginId, string documentId, string versionId = null, string revisionId = null);

        public async Task<Document> DeleteDocument(int documentId, int loginId)
        {
            return await _repository.DeleteDocument(documentId, loginId);
        }

        public async Task<Document> CheckOutDocument(int documentId, int loginId)
        {
            return await _repository.CheckOutDocument(documentId, loginId);
        }

        public async Task<Document> CheckInDocument(int documentId, string why, string what,
                                        bool isNewRevision, byte[] file, 
                                        string fileName, string extension, int loginId)
        {
            return await _repository.CheckInDocument(documentId, why, what,
                                        isNewRevision, file, fileName, extension, loginId);
        }

        public async Task<List<Document>> GetAllDocuments(bool isShared, int loginId)
        {
            return await _repository.GetAllDocuments(isShared, loginId);            
        }

        public async Task<Document> GetDocumentById(int documentId, int loginId)
        {
            return await _repository.GetDocumentById(documentId, loginId);
        }

        public async Task<List<Revision>> GetVersionDetails(int documentId, int loginId)
        {
            return await _repository.GetVersionDetails(documentId, loginId);
        }

        //public async Task CheckInDocument(int documentId, int loginId)
        //{
        //    return await _repository.GetVersionDetails(documentId, loginId);
        //}
    }
}
