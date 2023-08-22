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
        private readonly string _connectionString = "Server=localhost;Port=5432;User Id=postgres;Password=1234;Database=SwapShop";

        private readonly ILogger<UserController> _logger;

        public UserController(ILogger<UserController> logger)
        {
            _logger = logger;

        }
        [HttpPost("/create/user")]
        public ActionResult<User> CreateUser(User user)
        {
            var repository = new UserRepository(new NpgsqlConnection(_connectionString));
            return Ok(repository.CreateUser(user));
        }

    }
}
