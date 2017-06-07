using DMS.Abstraction.EmailService;
using DMS.Abstraction.UserProfile;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DMS.Abstraction
{
    public interface IUserRepository
    {
        Task<bool> ValidateLoginAttempt(string eMail);

        Task<User> Login(string eMail, string password);

        /// <summary>
        /// Add user method
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        Task<User> AddUser(User user, EmailConfiguration emailConfig);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="oldPwd"></param>
        /// <param name="newPwd"></param>
        /// <returns></returns>
        Task<bool> UpdatePassword(string eMail, string oldPwd, string newPwd);


        /// <summary>
        /// 
        /// </summary>
        /// <param name="eMail"></param>
        /// <returns></returns>
        Task<User> GetUserDetails(string eMail);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        Task<User> UpdateUserDetails(User user);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="eMail"></param>
        /// <param name="emailConfig"></param>
        /// <returns></returns>
        Task<bool> ForgotPassword(string eMail, EmailConfiguration emailConfig);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        IUserProfilePhoto GetEmployeeImage(string email);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="image"></param>
        /// <param name="eMail"></param>
        /// <returns></returns>
        IUserProfilePhoto UpdateEmployeeImage(UserProfilePhoto image, string eMail);



    }
}
