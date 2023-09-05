using Microsoft.EntityFrameworkCore;
using webapi.Data;

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

        public async Task CreateAsync(Product product)
        {
            using var dbContext = new DataContext();

            dbContext.Products.Add(product);
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

