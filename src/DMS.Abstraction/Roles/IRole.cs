using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction
{
    public interface IRole
    {
        int RoleId { get; set; }
        string RoleName { get; set; }
        bool IsActive { get; set; }
        DateTime? CreatedOn { get; set; }
        DateTime? UpdatedOn { get; set; }
        ICollection<Rights> Rights { get; set; } 
    }
}
