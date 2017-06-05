using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction.EmailService
{
    public interface IEmailConfiguration
    {

        /// <summary>
        /// 
        /// </summary>
        string SmtpServer { get; set; }
        /// <summary>
        /// 
        /// </summary>
        string SenderMail { get; set; }
        /// <summary>
        /// 
        /// </summary>
        string SmtpPassword { get; set; }
        /// <summary>
        /// 
        /// </summary>
        string SmtpUser { get; set; }
    }
}
