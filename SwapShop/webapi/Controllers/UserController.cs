using Microsoft.AspNetCore.Mvc;
using Npgsql;
using webapi.Models;
using webapi.Models.Repositories;

namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        //private readonly string _connectionString = "Server=localhost;Port=5432;User Id=postgres;Password=12345;Database=SwagShop";
        //private readonly string _connectionString = "Server=localhost;Port=5432;User Id=postgres;Password=1234;Database=SwapShop";
        private readonly string _connectionString = "Server=localhost;Port=5432;User Id=postgres;Password=0246802468;Database=SwapShop";


        [HttpGet("/users")]
        public ActionResult<IEnumerable<User>> GetAllUser()
        {
            var repository = new UserRepository(new NpgsqlConnection(_connectionString));
            return Ok(repository.GetAllUsers());
        }

        [HttpPost("/create/user")]
        public ActionResult<User> CreateUser(User user)
        {
            var repository = new UserRepository(new NpgsqlConnection(_connectionString));
            return Ok(repository.CreateUser(user));
        }

        [HttpPost("/login")]
        public ActionResult<int> LoginUser(User user)
        {
            var repository = new UserRepository(new NpgsqlConnection(_connectionString));
            return Ok(repository.LoginUser(user.Username, user.Password));
        }

        [HttpGet("/user/{userId}")]
        public ActionResult<User> GetUserById(int userId)
        {
            var repository = new UserRepository(new NpgsqlConnection(_connectionString));
            return Ok(repository.GetById(userId));
        }

    }
}
