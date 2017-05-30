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

        public async Task<bool> ValidateLoginAttempt(string eMail)
        {
            bool isSuccess = true;
            var filter = Builders<User>.Filter.Eq("Email", eMail);
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

                    var update = Builders<User>.Update.Set("LoginAttemptCount", 0).Set("LastLoginAttempt", DateTime.Now);
                    await _context.Users.UpdateOneAsync(filter, update);
                }
            }

            return isSuccess;
        }

        public async Task<User> Login(string eMail, string password)
        {

            var filter = Builders<User>.Filter.Eq("Email", eMail) & Builders<User>.Filter.Eq("Password", password);
            var objUser = await _context.Users.Find(filter).FirstOrDefaultAsync();
            if (objUser == null)
            {
                filter = Builders<User>.Filter.Eq("Email", eMail);
                objUser = await _context.Users.Find(filter).FirstOrDefaultAsync();
                if (objUser != null)
                {
                    objUser.LoginAttemptCount = (objUser.LoginAttemptCount + 1);
                    objUser.LastLoginAttempt = DateTime.Now;
                    var update = Builders<User>.Update.Set("LoginAttemptCount", (objUser.LoginAttemptCount + 1)).Set("LastLoginAttempt", DateTime.Now);
                    await _context.Users.UpdateOneAsync(filter, update);
                }
            }
            return objUser;
        }



        public async Task<User> AddUser(User user)
        {
            if (null != user)
            {
                //var filter =         
                var filter = Builders<User>.Filter.Eq("Email", user.Email);
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
        public async Task<bool> UpdatePassword(string eMail, string oldPwd, string newPwd)
        {
            if (!string.IsNullOrEmpty(eMail) && !string.IsNullOrEmpty(oldPwd) && !string.IsNullOrEmpty(newPwd))
            {
                var filter = Builders<User>.Filter.Eq("eMail", eMail) & Builders<User>.Filter.Eq("Password", oldPwd);
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="eMail"></param>
        /// <returns></returns>
        public async Task<User> GetUserDetails(string eMail)
        {
            var filter = Builders<User>.Filter.Eq("Email", eMail);
            var objUser = await _context.Users.Find(filter).FirstOrDefaultAsync();
            return objUser;
        }
    }
}
