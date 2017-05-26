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

<<<<<<< HEAD
        [HttpPost]
        public IActionResult AddUser([FromBody]User user)
        {
            return Execute(() => Ok(_userService.AddUser(user)));
=======
        [HttpGet("User/SampleUser")]
        public async Task<IActionResult> SampleUser()
        {
            User objUser = new Abstraction.User();

            objUser.UserId = 1;
            objUser.UserName = "admin";
            objUser.Password = "123";
            objUser.Picture = null;

            List<Rights> rightList = new List<Rights>();

            rightList.Add(new Rights {RightName="Add",RightId=1 });
            rightList.Add(new Rights { RightName = "Edit", RightId = 2 });
            rightList.Add(new Rights { RightName = "Delete", RightId = 3 });

            objUser.Roles.Add(new Role { CreatedOn = DateTime.Now, IsActive = true, RoleId = 1, RoleName = "User", UpdatedOn = DateTime.Now,Rights= rightList });

            //objUser = await _userService.Login(objUser);

            return Json(true);
>>>>>>> 192377b2a726cce987e6aa99418a0669b430996b
        }


    }
}
