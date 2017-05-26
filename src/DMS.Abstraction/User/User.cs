using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DMS.Abstraction
{
    [BsonIgnoreExtraElements]
    public class User : IUser
    {

        public User()
        {
            Roles = new List<Role>();
        }

      
        public List<Role> Roles { get; set; }

        public int UserId { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }

        public int LoginAttemptCount { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

        public string CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }

        public string ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }

        public string DeletedBy { get; set; }
        public DateTime? DeletedOn { get; set; }

        public DateTime? LastLoginAttempt { get; set; }

        public string[] Picture { get; set; }


    }
}
