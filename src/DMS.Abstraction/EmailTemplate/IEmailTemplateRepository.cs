﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction.EmailTemplate
{
    public interface IEmailTemplateRepository
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
        Task<EmailTemplate> UpdateEmailTemplateByName(EmailTemplate updateTemplate);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="templateName"></param>
        /// <returns></returns>
        IEmailTemplate GetEmailTemplate(string templateName);



    }
}
