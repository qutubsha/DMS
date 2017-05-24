using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction
{
    public class Company : ICompany
    {
        [BsonId]
        public string CompanyID { get; set; }
        public string CompanyName { get; set; }
        public string Description { get; set; }
    }
}
