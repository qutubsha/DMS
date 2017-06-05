using MailKit.Net.Smtp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction
{
    public interface IEmailService
    {
        Task SendMail(string recipients, string fromEmail, object data);
    }
}
