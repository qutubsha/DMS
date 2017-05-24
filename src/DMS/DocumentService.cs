﻿using DMS.Abstraction;
using DMS.Abstraction.Documents;
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

        public async Task<DeleteResult> DeleteDocument(int documentId, int loginId)
        {
            return await _repository.DeleteDocument(documentId, loginId);
        }

        //Task<Document> CheckOutDocument(string documentId, string loginId);

        //Task CheckInDocument(Document document, byte[] file);

        public async Task<List<Document>> GetAllDocuments(bool IsShared, int loginId)
        {
            return await _repository.GetAllDocuments(IsShared, loginId);            
        }
    }
}
