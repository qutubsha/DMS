using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction
{
    public interface IUserRepository
    {
        Task<bool> ValidateLoginAttempt(int userId);

        Task<User> Login(string userName, string password);

    }
}
