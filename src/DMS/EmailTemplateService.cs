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
    public class EmailTemplateService: IEmailTemplateService
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
        /// <returns></returns>
        public async Task<EmailTemplate> UpdateEmailTemplateByName(EmailTemplate updateTemplate)
        {
            return await _repository.UpdateEmailTemplateByName(updateTemplate);
        }

        public IEmailTemplate Process(int templateId, object data)
        {
            if (templateId <= 0) { throw new ArgumentException("TemplateId should not be less then or equal to 0"); }

            var template = GetEmailTemplateById(templateId);
            if (!string.IsNullOrWhiteSpace(template.EmailSubject))
                template.EmailSubject = HandlebarsDotNet.Handlebars.Compile(template.EmailSubject)(data);

            template.EmailBody = HandlebarsDotNet.Handlebars.Compile(template.EmailBody)(data);

            return template;
        }

        private IEmailTemplate GetEmailTemplateById(int templateId)
        {
            return _repository.GetEmailTemplateById(templateId);
        }
    }
}
