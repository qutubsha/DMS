using DMS.Abstraction;
using MailKit.Net.Smtp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS
{
    public class EmailService : IEmailService
    {
        public async Task SendMail(string recipients, string fromEmail, int templateId, object data)
        {
            //var template = TemplateService.Process(templateId, data);
            //var emailMessage = new MailMessage(fromEmail, recipients, template.Subject, template.Body) { IsBodyHtml = true };
            await Task.Run(() =>
            {
            //    try
            //    {
            //        smtpClient.Send(emailMessage);
            //    }
            //    catch (Exception ex)
            //    {
            //        Log.Error(ex.Message);
            //    }
            });
        }
    }
}
