using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction.Revisions
{
    public class Revision : IRevision
    {
        public int DocumentId { get; set; }

        public int VersionId { get; set; }

        public int RevisionId { get; set; }

        public int ModifiedBy { get; set; }

        public DateTime ModifiedOn { get; set; }

        public byte[] DocumentData { get; set; }

        public string FileName { get; set; }

        public string Extension { get; set; }

        public string Path { get; set; }

        public string What { get; set; }

        public string Why { get; set; }

        public double size { get; set; }
    }
}
