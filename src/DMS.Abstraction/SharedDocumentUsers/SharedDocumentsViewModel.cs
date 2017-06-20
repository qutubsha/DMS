using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction.SharedDocumentUsers
{
    public class SharedDocumentsViewModel
    {
        public DateTime CreatedOn { get; set; }

        public int CurrentRevision { get; set; }

        public int CurrentVersion { get; set; }

        public int? DeletedBy { get; set; }

        public DateTime DeletedOn { get; set; }

        public int DocumentId { get; set; }

        public string Extension { get; set; }

        public string FileName { get; set; }

        public bool IsDeleted { get; set; }

        public bool IsShared { get; set; }

        public string ModifiedBy { get; set; }

        public DateTime ModifiedOn { get; set; }

        public byte[] DocumentData { get; set; }

        public string DocumentTags { get; set; }

        public string CreatedByName { get; set; }

        public string LockedByName { get; set; }

        public string SharedByName { get; set; }

        public string SharedToName { get; set; }
    }
}
