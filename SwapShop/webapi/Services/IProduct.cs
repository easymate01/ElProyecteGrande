using webapi.DTOs;
using webapi.Models;
using webapi.Models.Categoires;

namespace webapi.Repositories
{
    public interface IProduct
    {


        Task<Product> UpdateProduct(string productId, ProductDto product);
        Task<Product> DeleteProduct(string productId);

        Task<IEnumerable<Product>?> GetAllProductAsync();
        Task<IEnumerable<Product>?> GetAllProductAvailableAsync();
        Task<Product>? GetById(string productId);
        Task<Product> CreateAsync(ProductDto product);
        Task<IEnumerable<Product>?> GetProductByCategoryAsync(MainCategory category);
        Task<IEnumerable<Product>?> GetProductsByUserIdAsync(string userId);
        Task<Product> SetProductUnAvailable(string productId);

        Task<List<MainCategoryDto>> GetAllMainCategories();
    }
}
