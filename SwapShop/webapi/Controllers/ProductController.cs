using Microsoft.AspNetCore.Authorization;
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

        //See all products at the /marketplace
        [HttpGet("/products")]
        public async Task<ActionResult<IEnumerable<Product>>> GetAllProducts()
        {
            var products = await _productService.GetAllProductAsync();
            return Ok(products);
        }
        [HttpGet("/products/available")]
        public async Task<ActionResult<IEnumerable<Product>>> GetAvailableProducts()
        {
            var products = await _productService.GetAllProductAvailableAsync();
            return Ok(products);
        }

        [HttpPost("/create/product"), Authorize(Roles = "Admin, User")]
        public async Task<ActionResult<Product>> CreateProduct(ProductDto product)
        {
            if (product.userId == null)
            {
                return BadRequest("Invalid userID. A valid userID is required.");
            }

            var newProduct = await _productService.CreateAsync(product);
            return Ok(newProduct);

        }

        [HttpGet("/product/{productId}"), Authorize(Roles = "Admin, User")]
        public async Task<ActionResult<Product>> GetProductById(string productId)
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

        [HttpPut("/product/update/{productId}"), Authorize(Roles = "Admin, User")]
        public async Task<ActionResult<Product>> UpdateProduct(string productId, ProductDto product)
        {
            var result = await _productService.UpdateProduct(productId, product);
            if (result == null)
            {
                return NotFound("This product doesn't exsist!");
            }
            return Ok(result);
        }

        [HttpDelete("/product/delete/{productId}"), Authorize(Roles = "Admin, User")]
        public async Task<ActionResult<Product>> DeleteProduct(string productId)
        {
            var productToDelete = await _productService.DeleteProduct(productId);
            if (productToDelete == null)
            {
                return NotFound("This product doesn't exist");
            }
            return Ok(productToDelete);
        }

        [HttpGet("/products/user/{userId}"), Authorize(Roles = "Admin, User")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductByUserId(string userId)
        {
            var productsByUserId = await _productService.GetProductsByUserIdAsync(userId);
            if (!productsByUserId.Any())
            {
                return NotFound("No products found for this user ID");
            }
            return Ok(productsByUserId);
        }

        [HttpPut("/product/sold/{productId}"), Authorize(Roles = "Admin, User")]
        public async Task<ActionResult<Product>> SetProductSold(string productId)
        {
            var result = await _productService.SetProductUnAvailable(productId);
            if (result == null)
            {
                return NotFound("This product doesn't exsist!");
            }
            return Ok(result);

        }
    }
}
