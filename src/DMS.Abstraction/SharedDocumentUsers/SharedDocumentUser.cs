using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction.SharedDocumentUsers
{
    [BsonIgnoreExtraElements]
    public class SharedDocumentUser : ISharedDocumentUser
    {
        public ICollection<SharedDocument> SharedDocuments { get; set; }

        public int UserId { get; set; }
    }
}
