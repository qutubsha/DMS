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

        public async Task<User> AddUser(User user)
        {
            // Throws null exception if user value is null
            if (user == null) throw new ArgumentNullException(nameof(user), "User should not be null");

            // Validate user before saving it to database
            UserValidator.IsValid(user);

            // returns new user
            return await _repository.AddUser(user);
        }
    }
}
