using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction.DocumentAccessHistory
{
    [BsonIgnoreExtraElements]
    public class DocumentAccessHistory : IDocumentAccessHistory
    {
        public int HistoryId { get; set; }

        public int DocumentId { get; set; }

        public DateTime PerformedOn { get; set; }

        public int PerformedBy { get; set; }

        public string Action { get; set; }
    }
}
