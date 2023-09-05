using Microsoft.AspNetCore.Mvc;
using webapi.DTOs;
using webapi.Models;
using webapi.Models.Repositories;

namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : Controller
    {
        private readonly IProduct _productRepository;
        private readonly ILogger<UserController> _logger;


        public ProductController(ILogger<UserController> logger, IProduct productRepository)
        {
            _productRepository = productRepository;
            _logger = logger;
        }

        [HttpGet("/products")]
        public async Task<ActionResult<IEnumerable<Product>>> GetAllProducts()
        {
            var products = await _productRepository.GetAllProductAsync();
            return Ok(products);
        }

        [HttpPost("/create/product")]
        public async Task<ActionResult<Product>> CreateProduct(ProductDto product)
        {
            if (product.userId == null || product.userId <= 0)
            {
                return BadRequest("Invalid userID. A valid userID is required.");
            }
            var newProduct = new Product
            {
                Name = product.Name,
                Category = product.Category,
                Description = product.Description,
                Price = product.Price,
                userId = product.userId
            };
            await _productRepository.CreateAsync(newProduct);
            return Ok("Product created!");

        }

        [HttpGet("/product/{productId}")]
        public async Task<ActionResult<Product>> GetProductById(int productId)
        {
            var product = await _productRepository.GetById(productId);
            if (product == null)
            {
                return Conflict("Product doesn't exsist!");
            }
            return Ok(product);
        }

        [HttpGet("/products/{productCategory}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsByCategory(string productCategory)
        {
            var existProduct = await _productRepository.GetProductByCategoryAsync(productCategory);
            if (existProduct == null)
            {
                return Conflict("This product doesn't exsist!");
            }
            return Ok(existProduct);
        }

    }
}
