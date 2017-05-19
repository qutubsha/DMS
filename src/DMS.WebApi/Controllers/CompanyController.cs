using DMS.Abstraction;
using DMS.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.WebApi.Controllers
{
    [Route("[controller]")]
    public class CompanyController:BaseController<CompanyController>
    {
        readonly CompanyService _companyService;

        public CompanyController(ILogger<CompanyController> logger, IOptions<Settings> settings) : base(logger)
        {
            
            var repository = new CompanyRepository(settings);
            _companyService = new CompanyService(repository);
        }

        [HttpPut]
        public IActionResult AddCompany([FromBody]Company company)
        {
            return Execute(() => Ok(_companyService.AddCompany(company)));
        }
    }
}
