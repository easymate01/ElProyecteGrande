using webapi.DTOs;
using webapi.Models;

namespace webapi.Repositories
{
    public interface IProduct
    {


        Task<Product> UpdateProduct(string productId, ProductDto product);
        Task<Product> DeleteProduct(string productId);

        Task<IEnumerable<Product>?> GetAllProductAsync();
        Task<Product>? GetById(string productId);
        Task<Product> CreateAsync(ProductDto product);
        Task<IEnumerable<Product>?> GetProductByCategoryAsync(string category);
        Task<IEnumerable<Product>?> GetProductsByUserIdAsync(string userId);
      

    }
}
