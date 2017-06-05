using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;

namespace DMS.Abstraction.EmailTemplate
{
   
    public interface IEmailTemplate
    {
        
        string EmailTemplateName { get; set; }
        string EmailSubject { get; set; }
        string EmailBody { get; set; }
        /// <summary>
        /// 
        /// </summary>
        bool IsActive { get; set; }
        /// <summary>
        /// 
        /// </summary>
        string UpdatedBy { get; set; }
        /// <summary>
        /// 
        /// </summary>
        DateTime? UpdatedOn { get; set; }
    }
}
