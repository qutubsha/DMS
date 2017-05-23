using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction
{
    public class RoleRights : IRoleRights
    {
        public string Action { get; set; }


        public string Description { get; set; }


        public string RoleRightId { get; set; }

        

    }
}
