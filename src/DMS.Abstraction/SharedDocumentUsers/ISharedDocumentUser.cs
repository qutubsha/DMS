using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DMS.Abstraction.SharedDocumentUsers;

namespace DMS.Abstraction.SharedDocumentUsers
{
    public interface ISharedDocumentUser
    {
        int UserId { get; set; }

        ICollection<SharedDocument> SharedDocuments { get; set; }

    }
}
