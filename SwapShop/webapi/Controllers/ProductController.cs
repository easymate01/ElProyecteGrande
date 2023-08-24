using Microsoft.AspNetCore.Mvc;
using Npgsql;
using webapi.Models;
using webapi.Models.Repositories;

namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : Controller
    {
        //private readonly string _connectionString = "Server=localhost;Port=5432;User Id=postgres;Password=12345;Database=SwagShop";
        //private readonly string _connectionString = "Server=localhost;Port=5432;User Id=postgres;Password=1234;Database=SwapShop";
        private readonly string _connectionString = "Server=localhost;Port=5432;User Id=postgres;Password=0246802468;Database=SwapShop";

        [HttpGet("/products")]
        public ActionResult<IEnumerable<Product>> GetAllProducts()
        {
            var repository = new ProuductRepository(new NpgsqlConnection(_connectionString));
            return Ok(repository.GetAllProducts());
        }

        [HttpPost("/create/product")]
        public ActionResult<int> CreateProduct(Product product)
        {
            var repository = new ProuductRepository(new NpgsqlConnection(_connectionString));
            return Ok(repository.CreateProduct(product));
        }

        [HttpGet("/product/{productId}")]
        public ActionResult<Product> GetProductById(int productId)
        {
            var repository = new ProuductRepository(new NpgsqlConnection(_connectionString));
            return Ok(repository.GetProductById(productId));
        }

    }
}
