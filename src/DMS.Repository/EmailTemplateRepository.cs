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
                    EmailTemplateName = emailTemplate.EmailTemplateName,
                    IsActive = emailTemplate.IsActive,
                    UpdatedBy = emailTemplate.UpdatedBy,
                    UpdatedOn = emailTemplate.UpdatedOn

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
        public Task<EmailTemplate> GetEmailTemplateByName(string templateName)
        {
            var filter = Builders<EmailTemplate>.Filter.Eq("EmailTemplateName", templateName);
            return _context.EmailTemplate.Find(filter).FirstOrDefaultAsync();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="updateTemplate"></param>
        /// <returns></returns>
        public async Task<EmailTemplate> UpdateEmailTemplateByName(EmailTemplate updateTemplate)
        {
            if (null != updateTemplate)
            {
                var filter = Builders<EmailTemplate>.Filter.Eq("EmailTemplateName", updateTemplate.EmailTemplateName);
                EmailTemplate emailTemplate = await _context.EmailTemplate.Find(filter).FirstOrDefaultAsync();
                if (null != emailTemplate)
                {
                    var updateEmailTemplate = Builders<EmailTemplate>.Update.Set("EmailSubject", updateTemplate.EmailSubject).Set("EmailBody", updateTemplate.EmailBody)
                        .Set("IsActive", updateTemplate.IsActive).Set("UpdatedBy", updateTemplate.UpdatedBy).Set("UpdatedOn", DateTime.Now);
                    await _context.EmailTemplate.UpdateOneAsync(filter, updateEmailTemplate);
                    return updateTemplate;
                }
                else return null;
            }
            else return null;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="templateName"></param>
        /// <returns></returns>
        public IEmailTemplate GetEmailTemplate(string templateName)
        {
            var filter = Builders<EmailTemplate>.Filter.Eq("EmailTemplateName", templateName) & Builders<EmailTemplate>.Filter.Eq("IsActive", true);
            var emailTemp =  _context.EmailTemplate.Find(filter).FirstOrDefault();
            var emailTemplate = new EmailTemplate()
            {
                EmailBody = emailTemp.EmailBody,
                EmailSubject = emailTemp.EmailSubject,
                EmailTemplateName = emailTemp.EmailTemplateName,
                IsActive = emailTemp.IsActive,
                UpdatedBy = emailTemp.UpdatedBy,
                UpdatedOn = emailTemp.UpdatedOn
            };
            return emailTemplate;
        }


    }
}
