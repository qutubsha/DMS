using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using DMS.Repository;
using Microsoft.Extensions.Logging;
using DMS.Abstraction;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace DMS.WebApi.Controllers
{
    [Route("api/role")]
    public class RoleController : BaseController<RoleController>
    {
        readonly RoleService _roleService;

        public RoleController(ILogger<RoleController> logger, IOptions<Settings> settings) : base(logger)
        {
            var repository = new RoleRepository(settings);
            _roleService = new RoleService(repository);
        }

        [HttpGet]
        public IActionResult GetRoles()
        {
            return Execute(() => Ok(_roleService.GetRoles()));
        }

        [HttpPost]
        public IActionResult AddRole([FromBody] Role role)
        {
            return Execute(() => Ok(_roleService.AddRole(role)));
        }

        [HttpPut]
        public IActionResult UpdateRole([FromBody] Role role)
        {
            return Execute(() => Ok(_roleService.UpdateRole(role)));
        }
    }
}
