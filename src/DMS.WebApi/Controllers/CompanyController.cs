using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.WebApi.Controllers
{
    public class CompanyController:BaseController<CompanyController>
    {
        public CompanyController(ILogger<CompanyController> logger) : base(logger)
        {

        }
    }
}
