using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using DMS.Repository;
using Microsoft.Extensions.Logging;
using DMS.Abstraction;
using Microsoft.AspNetCore.Http;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace DMS.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class RoleController : BaseController<RoleController>
    {

        readonly RoleService _roleService;

        public RoleController(ILogger<RoleController> logger, IOptions<Settings> settings) : base(logger)
        {
            var repository = new RoleRepository(settings);
            _roleService = new RoleService(repository);
        }

        // GET: api/values
        [HttpGet]
        public List<Role> Get()
        {
            var rolecollections =   _roleService.GetAllRoles();
            return rolecollections;
            //return new List<string> { "cdf", "dfdf" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
