using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction
{
    public class Role : IRole
    {

        public Role()
        {
            RoleRights = new List<IRoleRights>();
        }

        public string RoleId { get; set; }

        public string RoleName { get; set; }

        public string Description { get; set; }

        public List<IRoleRights> RoleRights { get; set; }
    }
}
