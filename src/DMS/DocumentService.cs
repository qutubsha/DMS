using DMS.Abstraction.Documents;
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


        //Task<Document> AddDocument(Document document, byte[] file)
        //{
        //    return new Document();

        //}

        //Task<Document> GetDocument(string loginId, string documentId, string versionId = null, string revisionId = null);

        //Task<int> DeleteDocument(string documentId, string loginId);

        //Task<Document> CheckOutDocument(string documentId, string loginId);

        //Task CheckInDocument(Document document, byte[] file);

        //Task<List<Document>> GetAllDocuments(bool IsShared, string loginId);
    }
}
