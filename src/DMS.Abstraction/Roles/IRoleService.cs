﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction.Roles
{
    public interface IRoleService
    {
        List<Role> GetAllRoles();

        //Task<Roles> AddRole(Roles role);

        //Task<Roles> GetRole(string loginId, string roleId);
    }
}
