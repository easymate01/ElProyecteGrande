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

        [HttpGet("/users")]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUser()
        {
            var users = await _userService.GetAllUsersAsync();

            return Ok(users);
        }

        [HttpPost("/create/user")]
        public async Task<ActionResult<User>> CreateUser(UserDto user)
        {
            var newUser = await _userService.GetUserByNameAsync(user.Username);
            if (newUser == null)
            {
                await _userService.CreateUserAsync(user);
                return Ok("User created!");
            }

            return Conflict("Registration Failed: This username is already in use. Please choose a different username");
        }

        [HttpPost("/login")]
        public async Task<ActionResult<User>> LoginUser(UserDto user)
        {
            var existUser = await _userService.LoginUserAsync(user);
            if (existUser == null)
            {
                return BadRequest("Login Failed. Wrong data...");
            }

            return Ok(existUser);
        }

        [HttpGet("/user/{userId}")]
        public async Task<ActionResult<User>> GetUserById(int userId)
        {
            var existUser = await _userService.GetById(userId);
            if (existUser == null)
            {
                return Conflict("This user doesn't exsist!");
            }
            return Ok(existUser);
        }

    }
}
