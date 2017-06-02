using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using DMS.Abstraction;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace DMS.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class UserController : BaseController<UserController>
    {
        readonly IUserService _userService;

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
            return Execute(() => Ok(_userService.AddUser(user)));
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
            return _userService.ForgotPassword(eMail);
        }
    }
}
