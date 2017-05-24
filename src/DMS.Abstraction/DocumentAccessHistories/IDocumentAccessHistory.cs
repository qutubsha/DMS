using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction
{
    public interface IDocumentAccessHistory
    {
        int HistoryId { get; set; }

        int DocumentId { get; set; }

        DateTime PerformedOn { get; set; }

        int PerformedBy { get; set; }

        string Action { get; set; }
    }
}
