using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction.SharedDocumentUsers
{
    public interface ISharedDocumentUserService
    {
        List<SharedDocumentsViewModel> GetDocumentsSharedWithMe(int loggedInUserId);
        List<SharedDocumentsViewModel> GetDocumentsSharedByMe(int loggedInUserId);
        ISharedDocumentUser ShareDocument(SharedDocumentUser sharedDocUser, int loggedInUserId);
    }
}
