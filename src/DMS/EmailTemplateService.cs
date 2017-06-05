using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DMS.Abstraction;
using DMS.Repository;
using DMS.Validator;
using DMS.Abstraction.EmailTemplate;

namespace DMS
{
    public class EmailTemplateService : IEmailTemplateService
    {

        /// <summary>
        /// 
        /// </summary>
        private IEmailTemplateRepository _repository;

        public EmailTemplateService(IEmailTemplateRepository repository)
        {
            _repository = repository;
        }

        public List<IEmailTemplate> GetEmailTemplateList()
        {
            return _repository.GetEmailTemplateList();
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="templateName"></param>
        /// <returns></returns>
        public async Task<EmailTemplate> GetEmailTemplateByName(string templateName)
        {
            return await _repository.GetEmailTemplateByName(templateName);
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="updateTemplate"></param>
        /// <param name="updatedBy"></param>
        /// <returns></returns>
        public async Task<EmailTemplate> UpdateEmailTemplateByName(EmailTemplate updateTemplate)
        {
            return await _repository.UpdateEmailTemplateByName(updateTemplate);
        }

        public IEmailTemplate Process(string templateName, object data)
        {
            if (string.IsNullOrEmpty(templateName)) { throw new ArgumentException("TemplateName should not be empty or null"); }

            var template = GetEmailTemplateById(templateName);

            if (!string.IsNullOrWhiteSpace(template.EmailSubject))
                template.EmailSubject = HandlebarsDotNet.Handlebars.Compile(template.EmailSubject)(data);

            template.EmailBody = HandlebarsDotNet.Handlebars.Compile(template.EmailBody)(data);

            return template;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="templateName"></param>
        /// <returns></returns>
        private IEmailTemplate GetEmailTemplateById(string templateName)
        {
            return _repository.GetEmailTemplate(templateName);
        }
    }
}
