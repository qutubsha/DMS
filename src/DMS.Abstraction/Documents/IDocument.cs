using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction
{
    public interface IDocument
    {
        int DocumentId { get; set; }

        string FileName { get; set; }

        string Extension { get; set; }

        int CreatedBy { get; set; }

        //DateTime CreatedOn { get; set; }

        string ModifiedBy { get; set; }

       // string ModifiedOn { get; set; }

        bool IsDeleted { get; set; }

        int? DeletedBy { get; set; }

        DateTime DeletedOn { get; set; }

        int CurrentVersion { get; set; }

        int CurrentRevision { get; set; }

        bool IsShared { get; set; }

        int? LockedBy { get; set; }

        byte[] DocumentData { get; set; }

        string DocumentTags { get; set; }
    }
}
