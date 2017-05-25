using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction.Revisions
{
    public interface IRevision
    {
         int DocumentId { get; set; }

         int VersionId { get; set; }

         int RevisionId { get; set; }

         int ModifiedBy { get; set; }

         DateTime ModifiedOn { get; set; }

         byte[] DocumentData { get; set; }

         string FileName { get; set; }

         string Extension { get; set; }

         string Path { get; set; }

         string What { get; set; }

         string Why { get; set; }

         double size { get; set; }
    }
}
