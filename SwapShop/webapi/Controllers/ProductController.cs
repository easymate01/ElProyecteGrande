using Microsoft.AspNetCore.Mvc;
using webapi.DTOs;
using webapi.Models;
using webapi.Repositories;

namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : Controller
    {
        private readonly IProduct _productService;
        private readonly ILogger<UserController> _logger;


        public ProductController(ILogger<UserController> logger, IProduct productService)
        {
            _productService = productService;
            _logger = logger;
        }

        [HttpGet("/products")]
        public async Task<ActionResult<IEnumerable<Product>>> GetAllProducts()
        {
            var products = await _productService.GetAllProductAsync();
            return Ok(products);
        }

        [HttpPost("/create/product")]
        public async Task<ActionResult<Product>> CreateProduct(ProductDto product)
        {
            if (product.userId == null || product.userId <= 0)
            {
                return BadRequest("Invalid userID. A valid userID is required.");
            }

            var newProduct = await _productService.CreateAsync(product);
            return Ok(newProduct);

        }

        [HttpGet("/product/{productId}")]
        public async Task<ActionResult<Product>> GetProductById(int productId)
        {
            var product = await _productService.GetById(productId);
            if (product == null)
            {
                return Conflict("Product doesn't exsist!");
            }
            return Ok(product);
        }

        [HttpGet("/products/{productCategory}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsByCategory(string productCategory)
        {
            var existProduct = await _productService.GetProductByCategoryAsync(productCategory);
            if (existProduct == null)
            {
                return Conflict("This product doesn't exsist!");
            }
            return Ok(existProduct);
        }

    }
}
