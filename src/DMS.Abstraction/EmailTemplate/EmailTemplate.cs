using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction.EmailTemplate
{
    [BsonIgnoreExtraElements]
    public class EmailTemplate : IEmailTemplate
    {
       
        public string EmailTemplateName { get; set; }
        public string EmailSubject { get; set; }
        public string EmailBody { get; set; }

    }
}
