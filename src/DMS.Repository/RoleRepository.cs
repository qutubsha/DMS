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

        public async Task<List<Role>> GetAllRoles()
        {
            return await _context.Roles.Find(_ => true).ToListAsync(); ;
        }
        //public Task<Roles> GetRole(string loginId, string roleId)
        //{
        //   //TODO: Implement method
        //}
    }
}
