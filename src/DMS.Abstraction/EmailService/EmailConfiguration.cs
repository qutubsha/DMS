using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction.EmailService
{
    public class EmailConfiguration: IEmailConfiguration
    {

        /// <summary>
        /// 
        /// </summary>
       public string SmtpServer { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string SenderMail { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string SmtpPassword { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string SmtpUser { get; set; }
    }
}
