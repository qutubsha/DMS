using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction.Documents
{
    public class Document : IDocument
    {
        public string CreatedBy { get; set; }

        public string CreatedOn { get; set; }

        public string CurrentRevision { get; set; }

        public string CurrentVersion { get; set; }

        public string DeletedBy { get; set; }

        public string DeletedOn { get; set; }

        public string DocumentId { get; set; }

        public string Extension { get; set; }

        public string FileName { get; set; }

        public string IsDeleted { get; set; }

        public string IsShared { get; set; }

        public string LockedBy { get; set; }

        public string ModifiedBy { get; set; }

        public string ModifiedOn { get; set; }

        public byte[] DocumentData { get; set; }

        public string DocumentTags { get; set; }
    }
}


