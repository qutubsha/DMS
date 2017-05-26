using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DMS.Abstraction;
using DMS.Repository;
using DMS.Validator;

 namespace DMS
{
    public class UserService : IUserService
    {
        private static UserValidator UserValidator { get; } = new UserValidator();

        private IUserRepository _repository;

        public UserService(IUserRepository repository)
        {
            _repository = repository;
        }

        public async Task<User> Login(string userName, string password)
        {
            return await _repository.Login(userName, password);
        }

        public async Task<bool> ValidateLoginAttempt(int userId)
        {
            return await _repository.ValidateLoginAttempt(userId);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public async Task<User> AddUser(User user)
        {
            // Throws null exception if user value is null
            if (user == null) throw new ArgumentNullException(nameof(user), "User should not be null");

            // Validate user before saving it to database
            UserValidator.IsValid(user);

            // returns new user
            return await _repository.AddUser(user);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="oldPwd"></param>
        /// <param name="newPwd"></param>
        /// <returns></returns>
        public async Task<bool> UpdatePassword(string userName, string oldPwd, string newPwd)
        {  
            // Throws null exception if user value is null
            if (string.IsNullOrEmpty(userName)) throw new ArgumentNullException(nameof(userName), "User Name should not be empty");
            if (string.IsNullOrEmpty(oldPwd)) throw new ArgumentNullException(nameof(oldPwd), "Password should not be empty");
            if (string.IsNullOrEmpty(newPwd)) throw new ArgumentNullException(nameof(newPwd), "New Password should not be empty");

            return await _repository.UpdatePassword(userName, oldPwd, newPwd);
        }
    }
}
