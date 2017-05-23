using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction
{
    public interface IUser
    {

         int UserId { get; set; }

         string FirstName { get; set; }
         string LastName { get; set; }

         string UserName { get; set; }
         string Password { get; set; }
         string Email { get; set; }

         int LoginAttemptCount { get; set; }
         bool IsActive { get; set; }
         bool IsDeleted { get; set; }

         string CreatedBy { get; set; }
         DateTime CreatedOn { get; set; }

         string ModifiedBy { get; set; }
         DateTime ModifiedOn { get; set; }

         string DeletedBy { get; set; }
         DateTime DeletedOn { get; set; }

         DateTime LastLoginAttempt { get; set; }

        string[] Picture { get; set; }

    }
}
