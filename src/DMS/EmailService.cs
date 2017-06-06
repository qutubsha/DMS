using DMS.Abstraction;
using DMS.Abstraction.EmailTemplate;
using MailKit.Net.Smtp;
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
            //var emailMessage = new MailMessage(fromEmail, recipients, template.Subject, template.Body) { IsBodyHtml = true };
            await Task.Run(() =>
             {
                //try
                //{
                //    smtpClient.Send(emailMessage);
                //}
                //catch (Exception ex)
                //{
                //    Log.Error(ex.Message);
                //}
            });
        }
    }
}
