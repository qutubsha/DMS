using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction.SharedDocumentUsers
{
    public class SharedDocument : ISharedDocument
    {
        public int DocumentId { get; set; }

        public int SharedBy { get; set; }

        public DateTime? SharedOn { get; set; }
    }
}
