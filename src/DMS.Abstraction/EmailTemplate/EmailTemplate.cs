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
        /// <summary>
        /// 
        /// </summary>
        public string EmailTemplateName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string EmailSubject { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string EmailBody { get; set; }
        public bool IsActive { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string UpdatedBy { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public DateTime? UpdatedOn { get; set; }

    }
}
