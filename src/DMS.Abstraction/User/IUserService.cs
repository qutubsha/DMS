using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction
{
    public interface IUserService
    {
        Task<bool> ValidateLoginAttempt(int userId);

        Task<User> Login(string userName, string password);
    }
}
