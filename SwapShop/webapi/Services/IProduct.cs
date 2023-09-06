using webapi.DTOs;
using webapi.Models;

namespace webapi.Repositories
{
    public interface IProduct
    {


        Task<Product> UpdateProduct(int productId, ProductDto product);
        Task<Product> DeleteProduct(int productId);

        Task<IEnumerable<Product>?> GetAllProductAsync();
        Task<Product>? GetById(int productId);
        Task<Product> CreateAsync(ProductDto product);
        Task<IEnumerable<Product>?> GetProductByCategoryAsync(string category);
        Task<IEnumerable<Product>?> GetProductsByUserIdAsync(int userId);

    }
}
