using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DMS.Abstraction;
using DMS.Abstraction.Role;

namespace DMS
{
    public class RoleService : IRoleService
    {
        /// <summary>
        /// Private IRoleRepository variable
        /// </summary>
        private IRoleRepository _roleRepository;
        /// <summary>
        /// Setting private IRoleRepository variable
        /// </summary>
        /// <param name="roleRepository"></param>
        public RoleService(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        //public Task<Roles> AddRole(Roles role)
        //{
        //    //TODO: Implement method
        //}

        /// <summary>
        /// Gets all the roles 
        /// </summary>
        /// <param name="loginId"></param>
        /// <returns></returns>
        public List<Roles> GetAllRoles()
        {
           return  _roleRepository.GetAllRoles();
        }

        //public Task<Roles> GetRole(string loginId, string roleId)
        //{
        //    //TODO: Implement method
        //}
    }
}
