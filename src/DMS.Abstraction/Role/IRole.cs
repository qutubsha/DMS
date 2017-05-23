using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction
{
    public interface IRole
    {
        string RoleId { get; set; }
        string RoleName { get; set; }
        string Description { get; set; }
    }
}
