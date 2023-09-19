using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.DTOs;
using webapi.Models;
using webapi.Repositories;

namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly IUser _userService;
        private readonly ILogger<UserController> _logger;

        public UserController(ILogger<UserController> logger, IProduct product, IUser userService)
        {
            _userService = userService;
            _logger = logger;
        }

        [HttpGet("/users"), Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUser()
        {
            var users = await _userService.GetAllUsersAsync();

            return Ok(users);
        }



        [HttpGet("/user/{userId}"), Authorize(Roles = "Admin, User")]
        public async Task<ActionResult<User>> GetUserById(string userId)
        {
            var existUser = await _userService.GetById(userId);
            if (existUser == null)
            {
                return NotFound("This user doesn't exsist!");
            }
            return Ok(existUser);
        }


        [HttpPut("/user/update/{userId}"), Authorize(Roles = "Admin, User")]
        public async Task<ActionResult<User>> UpdateUser(string userId, UserDto user)
        {
            var result = await _userService.UpdateUser(userId, user);
            if (result == null)
            {
                return NotFound("This user doesn't exsist!");
            }
            return Ok(result);
        }

        [HttpDelete("/user/delete/{userId}"), Authorize(Roles = "Admin, User")]
        public async Task<ActionResult<Product>> DeleteUser(string userId)
        {
            var userToDelete = await _userService.DeleteUser(userId);
            if (userToDelete == null)
            {
                return NotFound("This user doesn't exist");
            }
            return Ok(userToDelete);
        }

    }
}
