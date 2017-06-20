using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction.SharedDocumentUsers
{
    public interface ISharedDocument
    {
        int DocumentId { get; set; }

        int SharedBy { get; set; }
        DateTime? SharedOn { get; set; }
    }
}
