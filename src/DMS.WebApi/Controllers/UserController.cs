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
    [Route("/")]
    public class UserController : BaseController<UserController>
    {
        readonly IUserService _userService;

        public UserController(ILogger<UserController> logger, IUserService services) : base(logger)
        {
            _userService = services;
        }

        [HttpGet("User/{UserName}/{Password}")]
        public async Task<IActionResult> Login(string UserName, string Password)
        {
            User objUser = new User();

            bool isSuccess = true;
            string Message=string.Empty;

            objUser = await _userService.Login(UserName, Password);
            if (objUser != null)
            {
                isSuccess = await _userService.ValidateLoginAttempt(objUser.UserId);
                if (isSuccess)
                {

                }
                else
                {
                    objUser = new User();
                    Message = "This user is locked, please try after some time.";
                }
            }
            else
            {
                isSuccess = false;
                Message = "Username or Password is incorrect";
            }


            return Json(new { User = objUser, IsSuccess = true, Message=Message });
        }


    }
}
