using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DMS.Abstraction;
using DMS.Abstraction.SharedDocumentUsers;

namespace DMS
{
    public class SharedDocumentUserService : ISharedDocumentUserService
    {
        private ISharedDocumentUserRepository _repository;

        public SharedDocumentUserService(ISharedDocumentUserRepository repository)
        {
            _repository = repository;
        }
        public List<SharedDocumentsViewModel> GetDocumentsSharedByMe(int loggedInUserId)
        {
            return _repository.GetDocumentsSharedByMe(loggedInUserId);
        }

        public List<SharedDocumentsViewModel> GetDocumentsSharedWithMe(int loggedInUserId)
        {
            return _repository.GetDocumentsSharedWithMe(loggedInUserId);
        }

        public ISharedDocumentUser ShareDocument(SharedDocumentUser sharedDocUser, int loggedInUserId)
        {
            throw new NotImplementedException();
        }
    }
}
