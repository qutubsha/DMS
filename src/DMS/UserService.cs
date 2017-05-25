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
    }
}
