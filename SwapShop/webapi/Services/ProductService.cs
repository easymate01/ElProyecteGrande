using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using webapi.Data;
using webapi.DTOs;
using webapi.Models;

namespace webapi.Repositories
{
    public class ProductService : IProduct
    {
        private readonly DataContext _dbContext;
        private readonly UserManager<IdentityUser> _userManager;

        public ProductService(DataContext dbContext, UserManager<IdentityUser> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }

        public async Task<Product> UpdateProduct(string productId, ProductDto product)
        {
            var newProduct = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id == productId);
            if (newProduct == null)
            {
                return null;
            }

            newProduct.Name = product.Name;
            newProduct.Category = product.Category;
            newProduct.Description = product.Description;
            newProduct.Price = product.Price;

            _dbContext.Products.Update(newProduct);
            await _dbContext.SaveChangesAsync();
            return newProduct;
        }

        public async Task<Product> DeleteProduct(string productId)
        {
            var productToDelete = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id == productId);
            if (productToDelete == null)
            {
                return null;
            }

            _dbContext.Products.Remove(productToDelete);
            await _dbContext.SaveChangesAsync();
            return productToDelete;
        }

        public async Task<IEnumerable<Product>?> GetAllProductAsync()
        {
            return await _dbContext.Products.ToListAsync();
        }

        public async Task<Product>? GetById(string productId)
        {
            return await _dbContext.Products
                .Include(p => p.User)
                .SingleOrDefaultAsync(c => c.Id == productId);
        }

        public async Task<Product> CreateAsync(ProductDto product)
        {
            var newProduct = new Product
            {
                Name = product.Name,
                Category = product.Category,
                Description = product.Description,
                Price = product.Price,
                User = await _dbContext.Users.FirstOrDefaultAsync(user => user.IdentityUserId == product.userId)
            };
            _dbContext.Products.Add(newProduct);
            await _dbContext.SaveChangesAsync();
            return newProduct;
        }

        public async Task<IEnumerable<Product>?> GetProductByCategoryAsync(string category)
        {
            return await _dbContext.Products
                .Where(product => product.Category == category).ToListAsync();
        }

        public async Task<IEnumerable<Product>?> GetProductsByUserIdAsync(string userId)
        {
            var dbContextUser = await _dbContext.Users.FirstOrDefaultAsync(user => user.IdentityUserId == userId);

            return await _dbContext.Products
                .Where(p => p.userId == dbContextUser.Id).ToListAsync();
        }

    }
}