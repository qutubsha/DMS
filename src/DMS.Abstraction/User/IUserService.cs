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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        Task<User> AddUser(User user);

        Task<bool> UpdatePassword(string userName, string oldPwd, string newPwd);
    }
}
