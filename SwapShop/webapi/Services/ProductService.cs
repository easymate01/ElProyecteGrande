using Microsoft.EntityFrameworkCore;
using webapi.Data;
using webapi.DTOs;
using webapi.Models;

namespace webapi.Repositories
{
    public class ProductService : IProduct
    {
        private readonly DataContext _dbContext;

        public ProductService(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Product>?> GetAllProductAsync()
        {
            return await _dbContext.Products.ToListAsync();
        }

        public async Task<Product>? GetById(int productId)
        {
            return await _dbContext.Products
                .Include(p => p.User)
                .SingleOrDefaultAsync(c => c.Id == productId);
        }

        public async Task CreateAsync(ProductDto product)
        {
            var newProduct = new Product
            {
                Name = product.Name,
                Category = product.Category,
                Description = product.Description,
                Price = product.Price,
                User = await _dbContext.Users.FirstOrDefaultAsync(user => user.Id == product.userId)
            };
            _dbContext.Products.Add(newProduct);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Product>?> GetProductByCategoryAsync(string category)
        {
            return await _dbContext.Products
                .Where(product => product.Category == category).ToListAsync();
        }
    }
}