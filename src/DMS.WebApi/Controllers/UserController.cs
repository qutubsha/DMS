using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using DMS.Abstraction;
using DMS.Abstraction.EmailService;
using DMS.Abstraction.UserProfile;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace DMS.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class UserController : BaseController<UserController>
    {
        readonly IUserService _userService;

        readonly string MailFrom = "ptms.hrms@gmail.com";
        readonly string SmtpServer = "smtp.gmail.com";
        readonly string SmtpUser = "ptms.hrms@gmail.com";
        readonly string SmtpPass = "sigma@123";

        public UserController(ILogger<UserController> logger, IUserService services) : base(logger)
        {
            _userService = services;

        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(User user)
        {
            return Execute(() => Ok(_userService.Login(user.Email, user.Password)));
        }


        [HttpPost("AddUser")]
        public IActionResult AddUser([FromBody]User user)
        {
            return Execute(() => Ok(_userService.AddUser(user, GetEmailConfiguration())));
        }

        /// <summary>
        /// Update password
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="oldPwd"></param>
        /// <param name="newPwd"></param>
        /// <returns></returns>
        [HttpPut("UpdatePassword/{eMail}/{oldPwd}/{newPwd}")]
        public IActionResult UpdatePassword(string eMail, string oldPwd, string newPwd)
        {

            return Execute(() => Ok(_userService.UpdatePassword(eMail, oldPwd, newPwd)));
        }
        [HttpGet("GetUserDetails/{eMail}")]
        public IActionResult GetUserDetails(string eMail)
        {
            return Execute(() => Ok(_userService.GetUserDetails(eMail)));
        }
        [HttpPut("UpdateUserDetails")]
        public IActionResult UpdateUserDetails([FromBody]User user)
        {
            return Execute(() => Ok(_userService.UpdateUserDetails(user)));

        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="eMail"></param>
        /// <returns></returns>
        [HttpGet("ForgotPassword/{eMail}")]
        public Task<bool> ForgotPassword(string eMail)
        {
            return _userService.ForgotPassword(eMail, GetEmailConfiguration());
        }

        private EmailConfiguration GetEmailConfiguration()
        {
            return new EmailConfiguration()
            {
                SenderMail = MailFrom,
                SmtpServer = SmtpServer,
                SmtpUser = SmtpUser,
                SmtpPassword = SmtpPass

            };
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="eMail"></param>
        /// <returns></returns>
        [HttpGet("GetEmployeeImage/{email}")]
        public IUserProfilePhoto GetEmployeeImage(string email)
        {
            return _userService.GetEmployeeImage(email);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="image"></param>
        /// <param name="eMail"></param>
        /// <returns></returns>
        [HttpPut("UpdateEmployeeImage")]
        public IUserProfilePhoto UpdateEmployeeImage([FromBody]UserProfilePhoto image, string eMail)
        {
            return _userService.UpdateEmployeeImage(image, eMail);
        }




        [HttpGet("GetUserlist")]
        public List<IUser> GetUserList()
        {
            return _userService.GetUserList();
        }

    }
}
