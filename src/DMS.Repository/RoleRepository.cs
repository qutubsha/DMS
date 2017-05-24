using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DMS.Abstraction;
using DMS.Abstraction.Roles;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace DMS.Repository
{
    public class RoleRepository : IRoleRepository
    {
        private readonly DMSContext _context = null;

        public RoleRepository(IOptions<Settings> settings)
        {
            _context = new DMSContext(settings);

        }
        //public Task<Roles> AddRole(Roles role)
        //{
        //   //TODO: Implement method
        //}

        public List<Role> GetAllRoles()
        {
            var roles = _context.Roles.Find(_ => true).ToList();
            return roles;
        }
        //public Task<Roles> GetRole(string loginId, string roleId)
        //{
        //   //TODO: Implement method
        //}
    }
}
