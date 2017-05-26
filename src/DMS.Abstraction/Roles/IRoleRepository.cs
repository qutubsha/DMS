using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction.Roles
{
    public interface IRoleRepository
    {
        List<IRole> GetRoles();

        IRole AddRole(Role role);

        IRole UpdateRole(Role role);
    }
}
