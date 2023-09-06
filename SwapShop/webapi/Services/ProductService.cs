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

        public async Task<Product> UpdateProduct(int productId, ProductDto product)
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

        public async Task<Product> DeleteProduct(int productId)
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

        public async Task<Product>? GetById(int productId)
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
                User = await _dbContext.Users.FirstOrDefaultAsync(user => user.Id == product.userId)
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

        public async Task<IEnumerable<Product>?> GetProductsByUserIdAsync(int userId)
        {
            return await _dbContext.Products
                .Where(p => p.userId == userId).ToListAsync();
        }
    }
}