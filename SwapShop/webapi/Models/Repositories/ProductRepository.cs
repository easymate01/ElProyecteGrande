using Microsoft.EntityFrameworkCore;
using webapi.Data;
using webapi.DTOs;

namespace webapi.Models.Repositories
{
    public class ProductRepository : IProduct
    {
        public async Task<IEnumerable<Product>?> GetAllProductAsync()
        {
            using var dbContext = new DataContext();
            return await dbContext.Products.ToListAsync();
        }

        public async Task<Product>? GetById(int productId)
        {
            using var dbContext = new DataContext();
            return await dbContext.Products
                .Include(p => p.User)
                .SingleOrDefaultAsync(c => c.Id == productId);
        }

        public async Task CreateAsync(ProductDto product)
        {
            using var dbContext = new DataContext();
            var newProduct = new Product
            {
                Name = product.Name,
                Category = product.Category,
                Description = product.Description,
                Price = product.Price,
                User = await dbContext.Users.FirstOrDefaultAsync(user => user.Id == product.userId)
            };
            dbContext.Products.Add(newProduct);
            await dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Product>?> GetProductByCategoryAsync(string category)
        {
            using var dbContext = new DataContext();
            return await dbContext.Products
                .Where(product => product.Category == category).ToListAsync();
        }
    }
}

