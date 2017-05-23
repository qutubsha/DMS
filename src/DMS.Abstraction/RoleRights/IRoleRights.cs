using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction
{
    public interface IRoleRights
    {
        string RoleRightId { get; set; }
        string Action { get; set; }
        string Description { get; set; }
    }
}
