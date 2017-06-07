using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DMS.Abstraction;
using DMS.Repository;
using DMS.Validator;
using DMS.Abstraction.EmailService;
using DMS.Abstraction.UserProfile;

namespace DMS
{
    public class UserService : IUserService
    {
        /// <summary>
        /// 
        /// </summary>
        private static UserValidator UserValidator { get; } = new UserValidator();

        /// <summary>
        /// 
        /// </summary>
        private IUserRepository _repository;

        /// <summary>
        /// 
        /// </summary>
        private IEmailService _emailService;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="repository"></param>
        /// <param name="emailService"></param>
        public UserService(IUserRepository repository, IEmailService emailService)
        {
            _repository = repository;
            _emailService = emailService;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="eMail"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public async Task<User> Login(string eMail, string password)
        {
            return await _repository.Login(eMail, password);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <param name="emailConfig"></param>
        /// <returns></returns>
        public async Task<User> AddUser(User user, EmailConfiguration emailConfig)
        {
            // Throws null exception if user value is null
            if (user == null) throw new ArgumentNullException(nameof(user), "User should not be null");

            // Validate user before saving it to database
            UserValidator.IsValid(user);

            // returns new user
            return await _repository.AddUser(user, emailConfig);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="oldPwd"></param>
        /// <param name="newPwd"></param>
        /// <returns></returns>
        public async Task<bool> UpdatePassword(string eMail, string oldPwd, string newPwd)
        {
            // Throws null exception if user value is null
            if (string.IsNullOrEmpty(eMail)) throw new ArgumentNullException(nameof(eMail), "User email should not be empty");
            if (string.IsNullOrEmpty(oldPwd)) throw new ArgumentNullException(nameof(oldPwd), "Password should not be empty");
            if (string.IsNullOrEmpty(newPwd)) throw new ArgumentNullException(nameof(newPwd), "New Password should not be empty");

            return await _repository.UpdatePassword(eMail, oldPwd, newPwd);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public async Task<User> GetUserDetails(string eMail)
        {
            // Throws null exception if user value is null
            if (string.IsNullOrEmpty(eMail)) throw new ArgumentNullException(nameof(eMail), "User eMail should not be null");

            // Validate user before saving it to database


            // returns new user
            return await _repository.GetUserDetails(eMail);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public async Task<User> UpdateUserDetails(User user)
        {
            // Throws null exception if user value is null
            if (null == user) throw new ArgumentNullException(nameof(user), "User should not be null");

            // Validate user before saving it to database


            // returns new user
            return await _repository.UpdateUserDetails(user);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="eMail"></param>
        /// <param name="emailConfig"></param>
        /// <returns></returns>
        public async Task<bool> ForgotPassword(string eMail, EmailConfiguration emailConfig)
        {
            // Throws null exception if user value is null
            if (string.IsNullOrEmpty(eMail)) throw new ArgumentNullException(nameof(eMail), "Email should not be null or empty");

            return await _repository.ForgotPassword(eMail, emailConfig);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public IUserProfilePhoto GetEmployeeImage(string email)
        {
            return _repository.GetEmployeeImage(email);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="image"></param>
        /// <param name="eMail"></param>
        /// <returns></returns>
        public IUserProfilePhoto UpdateEmployeeImage(UserProfilePhoto image, string eMail)
        {

            return _repository.UpdateEmployeeImage(image, eMail);
        }

        public List<IUser> GetUserList()
        {
            return _repository.GetUserList();
        }

    }
}
