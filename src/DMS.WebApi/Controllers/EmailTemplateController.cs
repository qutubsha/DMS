using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using DMS.Abstraction;
using DMS.Abstraction.EmailTemplate;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace DMS.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class EmailTemplateController : BaseController<EmailTemplateController>
    {
        readonly IEmailTemplateService _emailTemplateService;

        public EmailTemplateController(ILogger<EmailTemplateController> logger, IEmailTemplateService services) : base(logger)
        {
            _emailTemplateService = services;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<IEmailTemplate> GetEmailTemplateList()
        {
            return _emailTemplateService.GetEmailTemplateList();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="templateName"></param>
        /// <returns></returns>
        [HttpGet("{templateName}")]
        public Task<EmailTemplate> GetEmailTemplateByName(string templateName)
        {
            return _emailTemplateService.GetEmailTemplateByName(templateName);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="updateTemplate"></param>
        /// <returns></returns>
        [HttpPost]
        public Task<EmailTemplate> UpdateEmailTemplateByName([FromBody]EmailTemplate updateTemplate)
        {
            return _emailTemplateService.UpdateEmailTemplateByName(updateTemplate);
        }


    }
}
