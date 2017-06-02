using DMS.Abstraction;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Threading.Tasks;
using DMS.Abstraction.EmailTemplate;
using System.Collections.Generic;

namespace DMS.Repository
{
    /// <summary>
    /// 
    /// </summary>
    public class EmailTemplateRepository : IEmailTemplateRepository
    {
        private readonly DMSContext _context = null;
        public EmailTemplateRepository(IOptions<Settings> settings)
        {
            _context = new DMSContext(settings);

        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<IEmailTemplate> GetEmailTemplateList()
        {
            var lstRepositoryEmailTemplate = _context.EmailTemplate.AsQueryable().ToList();
            var lstEmailTemplate = new List<IEmailTemplate>();
            if (lstRepositoryEmailTemplate == null || lstRepositoryEmailTemplate.Count <= 0) { throw new NullReferenceException(nameof(lstRepositoryEmailTemplate)); }
            foreach (EmailTemplate emailTemplate in lstRepositoryEmailTemplate)
            {
                var localEmailTemplate = new EmailTemplate()
                {
                    EmailBody = emailTemplate.EmailBody,
                    EmailSubject = emailTemplate.EmailSubject,
                    TemplateName = emailTemplate.TemplateName

                };

                lstEmailTemplate.Add(localEmailTemplate);
            }
            return lstEmailTemplate;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="templateName"></param>
        /// <returns></returns>
        public async Task<EmailTemplate> GetEmailTemplateByName(string templateName)
        {
            var filter = Builders<EmailTemplate>.Filter.Eq("TemplateName", templateName);
            return await _context.EmailTemplate.Find(filter).FirstOrDefaultAsync();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="templateName"></param>
        /// <returns></returns>
        public async Task<EmailTemplate> UpdateEmailTemplateByName(EmailTemplate updateTemplate)
        {
            if (null != updateTemplate)
            {
                var filter = Builders<EmailTemplate>.Filter.Eq("TemplateName", updateTemplate.TemplateName);
                EmailTemplate emailTemplate = await _context.EmailTemplate.Find(filter).FirstOrDefaultAsync();
                if (null != emailTemplate)
                {
                    var updateEmailTemplate = Builders<EmailTemplate>.Update.Set("EmailSubject", updateTemplate.EmailSubject).Set("EmailBody", updateTemplate.EmailBody);
                    await _context.EmailTemplate.UpdateOneAsync(filter, updateEmailTemplate);
                    return  updateTemplate;
                }
                else return null;
            }
            else return null;
        }
    }
}
