using DMS.Abstraction;
using DMS.Abstraction.EmailTemplate;
using MailKit.Net.Smtp;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS
{
    public class EmailService : IEmailService
    {
        private IEmailTemplateService TemplateService { get; }

        public EmailService(IEmailTemplateService templateService)
        {
            //Log = LogManager.GetLogger(GetType().FullName);
            TemplateService = templateService;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="recipients"></param>
        /// <param name="fromEmail"></param>
        /// <param name="data"></param>
        /// <param name="smtpClient"></param>
        /// <returns></returns>
        public async Task SendMail(string recipients, string fromEmail, string templateName, object data, SmtpClient smtpClient)
        {
            var template = TemplateService.Process(templateName, data);
            //var emailMessage = new MimeMessage(fromEmail, recipients, template.Subject, template.Body) { IsBodyHtml = true };


            BodyBuilder bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = template.EmailBody;

            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress(fromEmail));
            emailMessage.To.Add(new MailboxAddress(recipients));
            emailMessage.Subject = template.EmailSubject;
            emailMessage.Body = bodyBuilder.ToMessageBody();

            await Task.Run(() =>
             {
                 try
                 {
                     smtpClient.Send(emailMessage);
                     smtpClient.Disconnect(true);
                 }
                 catch (Exception ex)
                 {
                     string log = ex.Message;
                     
                 }
             });
        }
    }
}
