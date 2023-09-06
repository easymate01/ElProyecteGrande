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
                return NotFound("Product doesn't exsist!");
            }
            return Ok(product);
        }

        [HttpGet("/products/{productCategory}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsByCategory(string productCategory)
        {
            var existProduct = await _productService.GetProductByCategoryAsync(productCategory);
            if (existProduct == null)
            {
                return NotFound("This product doesn't exsist!");
            }
            return Ok(existProduct);
        }

        [HttpPut("/product/update/{productId}")]
        public async Task<ActionResult<Product>> UpdateProduct(int productId, ProductDto product)
        {
            var result = await _productService.UpdateProduct(productId, product);
            if (result == null)
            {
                return NotFound("This product doesn't exsist!");
            }
            return Ok(result);
        }

        [HttpDelete("/product/delete/{productId}")]
        public async Task<ActionResult<Product>> DeleteProduct(int productId)
        {
            var productToDelete = await _productService.DeleteProduct(productId);
            if (productToDelete == null)
            {
                return NotFound("This product doesn't exist");
            }
            return Ok(productToDelete);
        }

        [HttpGet("/products/user/{userId}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductByUserId(int userId)
        {
            var productsByUserId = await _productService.GetProductsByUserIdAsync(userId);
            if (!productsByUserId.Any())
            {
                return NotFound("No products found for this user ID");
            }
            return Ok(productsByUserId);
        }
    }
}
