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

        string CreatedBy { get; set; }

        //string CreatedOn { get; set; }

        string ModifiedBy { get; set; }

       // string ModifiedOn { get; set; }

        bool IsDeleted { get; set; }

        string DeletedBy { get; set; }

        //string DeletedOn { get; set; }

        int CurrentVersion { get; set; }

        int CurrentRevision { get; set; }

        bool IsShared { get; set; }

        int LockedBy { get; set; }

        byte[] DocumentData { get; set; }

        string DocumentTags { get; set; }
    }
}
