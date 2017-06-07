using DMS.Abstraction;
using DMS.Abstraction.EmailService;
using DMS.Abstraction.EmailTemplate;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;



namespace DMS.Repository
{
    public class UserRepository : IUserRepository
    {
        /// <summary>
        /// 
        /// </summary>
        public readonly DMSContext _context = null;
        /// <summary>
        /// 
        /// </summary>
        public readonly IEmailService EmailService;
       
        /// <summary>
        /// 
        /// </summary>
        /// <param name="settings"></param>
        /// <param name="emailService"></param>
        public UserRepository(IOptions<Settings> settings, IEmailService emailService)
        {
            _context = new DMSContext(settings);
            EmailService = emailService;
            
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

            return await AuthenticUserLocked(eMail, password);
        }

        public async Task<User> AddUser(User user, EmailConfiguration emailConfig)
        {
            if (null != user)
            {
                SmtpClient smtpClient = new SmtpClient();
                smtpClient.Connect(emailConfig.SmtpServer, 465, SecureSocketOptions.SslOnConnect);
                smtpClient.Authenticate(emailConfig.SmtpUser, emailConfig.SmtpPassword);

                var filter = Builders<User>.Filter.Eq("Email", user.Email);
                var objUser = await _context.Users.Find(filter).FirstOrDefaultAsync();
                if (null == objUser)
                {
                    // To Do: demo purpose - to be improved
                    var maxUserId = _context.Users.AsQueryable().Max(p => p.UserId);
                    user.IsActive = true;
                    user.UserId = ++maxUserId; 
                    await _context.Users.InsertOneAsync(user);

                    //await EmailService.SendMail(objUser.Email, emailConfig.SenderMail,CommonEnums.EmailTemplates.WelComeUser.ToString(),
                    //    new
                    //    {
                    //        FullName = objUser.FirstName + string.Empty + objUser.LastName,
                    //        TemplateName = CommonEnums.EmailTemplates.WelComeUser.ToString()
                    //    }, smtpClient);
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
                var filter = Builders<User>.Filter.Eq("Email", eMail) & Builders<User>.Filter.Eq("Password", oldPwd);
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

        public async Task<User> UpdateUserDetails(User user)
        {
            if (null != user)
            {
                if (!string.IsNullOrEmpty(user.FirstName) && !string.IsNullOrEmpty(user.LastName))
                {
                    var filter = Builders<User>.Filter.Eq("Email", user.Email);
                    var objUser = await _context.Users.Find(filter).FirstOrDefaultAsync();
                    if (null != objUser)
                    {
                        var update = Builders<User>.Update.Set("FirstName", user.FirstName).Set("LastName", user.LastName);
                        await _context.Users.UpdateOneAsync(filter, update);
                        return objUser;
                    }
                    return null;
                }
            }
            return null;
        }

        private async Task<User> AuthenticUserLocked(string eMail, string password)
        {
            var filter = Builders<User>.Filter.Eq("Email", eMail);
            User objUser = await _context.Users.Find(filter).FirstOrDefaultAsync();
            if (null != objUser)
            {
                if (objUser.LoginAttemptCount >= 3 && objUser.LastLoginAttempt.Value.AddHours(3) >= DateTime.Now.Subtract(new TimeSpan(5, 30, 0)))
                {
                    return null;
                }
                else
                {
                    var filterValidate = Builders<User>.Filter.Eq("Email", eMail) & Builders<User>.Filter.Eq("Password", password);
                    User validateUser = await _context.Users.Find(filterValidate).FirstOrDefaultAsync();
                    if (null == validateUser)
                    {
                        if (objUser.LastLoginAttempt != null)
                        {
                            if (objUser.LoginAttemptCount <= 3 && objUser.LastLoginAttempt.Value.AddHours(3) <= DateTime.Now.Subtract(new TimeSpan(5, 30, 0)))
                            {
                                var update = Builders<User>.Update.Set("LoginAttemptCount", (objUser.LoginAttemptCount >= 3 ? 1 : (objUser.LoginAttemptCount + 1))).Set("LastLoginAttempt", DateTime.Now);
                                await _context.Users.UpdateOneAsync(filter, update);
                                return null;
                            }
                            else
                            {
                                var update = Builders<User>.Update.Set("LoginAttemptCount", (objUser.LoginAttemptCount + 1)).Set("LastLoginAttempt", DateTime.Now);
                                await _context.Users.UpdateOneAsync(filter, update);
                                return null;
                            }
                        }
                        else
                        {
                            var update = Builders<User>.Update.Set("LoginAttemptCount", (objUser.LoginAttemptCount + 1)).Set("LastLoginAttempt", DateTime.Now);
                            await _context.Users.UpdateOneAsync(filter, update);
                            return null;
                        }
                    }
                    else
                    {
                        var update = Builders<User>.Update.Set("LoginAttemptCount", 0).Set("LastLoginAttempt", BsonNull.Value);
                        await _context.Users.UpdateOneAsync(filter, update);
                    }

                }
            }
            else return null;
            return objUser;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="eMail"></param>
        /// <param name="emailConfig"></param>
        /// <returns></returns>
        public async  Task<bool> ForgotPassword(string eMail, EmailConfiguration emailConfig)
        {
            if (!string.IsNullOrEmpty(eMail))
            {
                SmtpClient smtpClient = new SmtpClient();
                smtpClient.Connect(emailConfig.SmtpServer, 465, SecureSocketOptions.SslOnConnect);
                smtpClient.Authenticate(emailConfig.SmtpUser, emailConfig.SmtpPassword);

                var filter = Builders<User>.Filter.Eq("Email", eMail);
                var objUser = await _context.Users.Find(filter).FirstOrDefaultAsync();
                if (null != objUser)
                {
                     await EmailService.SendMail(objUser.Email, emailConfig.SenderMail, CommonEnums.EmailTemplates.ForgotPassword.ToString(),
                         new
                         {
                             FullName = objUser.FirstName + string.Empty + objUser.LastName,
                             TemplateName = CommonEnums.EmailTemplates.ForgotPassword.ToString(),
                             Email = objUser.Email.Trim(),
                             Password = objUser.Password.Trim()
                         }, smtpClient);
                    return true;
                }
                else return false;
            }
            else return false;
        }


        public List<IUser> GetUserList()
        {
            var lstRepositoryUserdetails = _context.Users.AsQueryable().ToList();
            var lstuser = new List<IUser>();
            if (lstRepositoryUserdetails == null || lstRepositoryUserdetails.Count <= 0) { throw new NullReferenceException(nameof(lstRepositoryUserdetails)); }
            foreach (User userdetails in lstRepositoryUserdetails)
            {
                var localuserdetail = new User()
                {
                    FirstName = userdetails.FirstName,
                    LastName = userdetails.LastName,
                    Email = userdetails.Email,
                    IsActive = userdetails.IsActive,
                    CreatedBy = userdetails.CreatedBy,
                    CreatedOn = userdetails.CreatedOn,
                    LoginAttemptCount = userdetails.LoginAttemptCount,
                    Password = userdetails.Password,
                    UserId = userdetails.UserId,
                    Picture = userdetails.Picture,
                    Roles = userdetails.Roles,
                    IsDeleted = userdetails.IsDeleted,
                    DeletedBy=userdetails.DeletedOn.ToString(),
                    ModifiedBy=userdetails.ModifiedBy,
                    ModifiedOn=userdetails.ModifiedOn,
                   DeletedOn=userdetails.DeletedOn,
                   LastLoginAttempt=userdetails.LastLoginAttempt,
                   UserName=userdetails.UserName 

                };

                lstuser.Add(localuserdetail);
            }
            return lstuser;
        }
    }
}
