using MailKit.Net.Smtp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction
{
    public interface IEmailService
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="recipients"></param>
        /// <param name="fromEmail"></param>
        /// <param name="templateName"></param>
        /// <param name="data"></param>
        /// <param name="smtpClient"></param>
        /// <returns></returns>
        Task SendMail(string recipients, string fromEmail, string templateName, object data, SmtpClient smtpClient);
    }
}
