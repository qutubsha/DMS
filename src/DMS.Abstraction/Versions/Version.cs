using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction.Documents
{
    public class Version : IVersion
    {
        public string DocumentId { get; set; }

        public string VersionId { get; set; }

        public string ModifiedBy { get; set; }

        public string ModifiedOn { get; set; }

        public string CurrentVersion { get; set; }

        public string CurrentRevision { get; set; }

        public byte[] DocumentData { get; set; }

        public string DocumentTags { get; set; }
    }
}


