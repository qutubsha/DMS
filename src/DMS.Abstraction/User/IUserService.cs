using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction
{
    public interface IUserService
    {


        Task<User> Login(string eMail, string password);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        Task<User> AddUser(User user);

        Task<bool> UpdatePassword(string eMail, string oldPwd, string newPwd);


        /// <summary>
        /// 
        /// </summary>
        /// <param name="eMail"></param>
        /// <returns></returns>
        Task<User> GetUserDetails(string eMail);
    }
}
