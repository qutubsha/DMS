using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DMS.Abstraction;
using DMS.Abstraction.Roles;

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

        /// <summary>
        /// Gets all the roles 
        /// </summary>
        /// <param name="loginId"></param>
        /// <returns></returns>
        public List<IRole> GetRoles()
        {
            return _roleRepository.GetRoles();
        }

        public IRole AddRole(Role role)
        {
            return _roleRepository.AddRole(role);
        }

        public IRole UpdateRole(Role role)
        {
            return _roleRepository.UpdateRole(role);
        }

        public List<IRights> GetRights()
        {
            return _roleRepository.GetRights();
        }
    }
}
