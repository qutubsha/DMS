using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction.Documents
{
    public interface IVersion
    {
        string DocumentId { get; set; }

        string VersionId { get; set; }

        string ModifiedBy { get; set; }

        string ModifiedOn { get; set; }

        string CurrentVersion { get; set; }

        string CurrentRevision { get; set; }

        byte[] DocumentData { get; set; }

        string DocumentTags { get; set; }
    }


}
