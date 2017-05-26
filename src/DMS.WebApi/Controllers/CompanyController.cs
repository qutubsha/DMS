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
    [Route("api/[controller]")]
    public class CompanyController : BaseController<CompanyController>
    {
        readonly CompanyService _companyService;

        public CompanyController(ILogger<CompanyController> logger, IOptions<Settings> settings) : base(logger)
        {

            var repository = new CompanyRepository(settings);
            _companyService = new CompanyService(repository);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Execute(() => Ok("Get Something"));
        }

        [HttpPost]
        public IActionResult AddCompany([FromBody]Company company)
        {
            return Execute(() => Ok(_companyService.AddCompany(company)));
        }
    }
}
