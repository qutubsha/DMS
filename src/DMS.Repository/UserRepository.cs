using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DMS.Abstraction;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace DMS.Repository
{
    public class UserRepository : IUserRepository
    {
        public readonly DMSContext _context = null;

        public UserRepository(IOptions<Settings> settings)
        {
            _context = new DMSContext(settings);
        }

        public async Task<bool> ValidateLoginAttempt(int userId)
        {
            bool isSuccess = true;
            var filter = Builders<User>.Filter.Eq("UserId", userId);
            User objUser = await _context.Users.Find(filter).FirstOrDefaultAsync();
            if (objUser != null && objUser.LoginAttemptCount >= 3 && DateTime.Now < objUser.LastLoginAttempt.Value.AddHours(3))
            {
                isSuccess = false;
            }
            else if (objUser != null)
            {
                if (DateTime.Now > objUser.LastLoginAttempt.Value.AddHours(3) && objUser.LoginAttemptCount >= 3)
                {
                    objUser.LoginAttemptCount = 0;
                    objUser.LastLoginAttempt = DateTime.Now;

                    var update = Builders<User>.Update.Set(s => s, objUser);
                    await _context.Users.UpdateOneAsync(filter, update);
                }
            }

            return isSuccess;
        }

        public async Task<User> Login(string userName, string password)
        {
            //User objUser = new User();

            //var filter =         
            var filter = Builders<User>.Filter.Eq("UserName", userName) & Builders<User>.Filter.Eq("Password", password);
            var objUser = await _context.Users.Find(filter).FirstOrDefaultAsync();
            if (objUser == null)
            {
                filter = Builders<User>.Filter.Eq("UserName", userName);
                objUser = await _context.Users.Find(filter).FirstOrDefaultAsync();
                if (objUser != null)
                {
                    objUser.LoginAttemptCount = (objUser.LoginAttemptCount + 1);
                    objUser.LastLoginAttempt = DateTime.Now;

                    var update = Builders<User>.Update.Set("LoginAttemptCount", (objUser.LoginAttemptCount + 1)).Set("LastLoginAttempt", DateTime.Now);
                    await _context.Users.UpdateOneAsync(filter, update);

                    objUser = null;
                }
            }
            return objUser;
        }

        public async Task<User> AddUser(User user)
        {
            if (null != user)
            {
                //var filter =         
                var filter = Builders<User>.Filter.Eq("UserName", user.UserName);
                var objUser = await _context.Users.Find(filter).FirstOrDefaultAsync();
                if (null == objUser)
                {
                    await _context.Users.InsertOneAsync(user);
                }
                else
                    user = null;
            }
            else
                user = null;

            return user;
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
            if (!string.IsNullOrEmpty(userName) && !string.IsNullOrEmpty(oldPwd) && !string.IsNullOrEmpty(newPwd))
            {
                var filter = Builders<User>.Filter.Eq("UserName", userName) & Builders<User>.Filter.Eq("Password", oldPwd);
                var objUser = await _context.Users.Find(filter).FirstOrDefaultAsync();
                if (null != objUser)
                {
                    var update = Builders<User>.Update.Set("Password", newPwd);
                    await _context.Users.UpdateOneAsync(filter, update);
                    return true;
                }
                else { return false; }
            }
            else { return false; }
        }
    }
}
