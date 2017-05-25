using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction.Revisions
{
    public interface IRevision
    {
        string DocumentId { get; set; }

        string RevisionId { get; set; }

        string ModifiedBy { get; set; }

        string ModifiedOn { get; set; }

        string CurrentVersion { get; set; }

        string CurrentRevision { get; set; }

        byte[] DocumentData { get; set; }

        string DocumentTags { get; set; }

        string FileName { get; set; }

        string Extension { get; set; }
    }
}
