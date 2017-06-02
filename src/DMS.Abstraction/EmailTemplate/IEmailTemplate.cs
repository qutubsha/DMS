using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;

namespace DMS.Abstraction.EmailTemplate
{
   
    public interface IEmailTemplate
    {
        
        string TemplateName { get; set; }
        string EmailSubject { get; set; }
        string EmailBody { get; set; }
    }
}
