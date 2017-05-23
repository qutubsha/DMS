using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction.Documents
{
    public interface IDocument
    {
        string DocumentId { get; set; }

        string FileName { get; set; }

        string Extension { get; set; }

        string CreatedBy { get; set; }

        string CreatedOn { get; set; }

        string ModifiedBy { get; set; }

        string ModifiedOn { get; set; }

        string IsDeleted { get; set; }

        string DeletedBy { get; set; }

        string DeletedOn { get; set; }

        string CurrentVersion { get; set; }

        string CurrentRevision { get; set; }

        string IsShared { get; set; }

        string LockedBy { get; set; }

        byte[] DocumentData { get; set; }

        string DocumentTags { get; set; }
    }


}
