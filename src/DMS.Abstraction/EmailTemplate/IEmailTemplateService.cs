﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction.EmailTemplate
{
    public interface IEmailTemplateService
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        List<IEmailTemplate> GetEmailTemplateList();
        /// <summary>
        /// 
        /// </summary>
        /// <param name="templateName"></param>
        /// <returns></returns>
        Task<EmailTemplate> GetEmailTemplateByName(string templateName);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="updateTemplate"></param>
        /// <param name="updatedBy"></param>
        /// <returns></returns>
        Task<EmailTemplate> UpdateEmailTemplateByName(EmailTemplate updateTemplate, string updatedBy);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="templateId"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        IEmailTemplate Process(int templateId, object data);
    }
}
