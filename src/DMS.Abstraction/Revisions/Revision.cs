using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction.Revisions
{
    public class Revision : IRevision
    {
        public string DocumentId { get; set; }

        public string RevisionId { get; set; }

        public string ModifiedBy { get; set; }

        public string ModifiedOn { get; set; }

        public string CurrentVersion { get; set; }

        public string CurrentRevision { get; set; }

        public byte[] DocumentData { get; set; }

        public string DocumentTags { get; set; }

        public string FileName { get; set; }

        public string Extension { get; set; }

    }
}
