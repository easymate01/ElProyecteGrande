namespace webapi.Models.Repositories
{
    public interface IProduct
    {


        //int UpdateProduct(Product product);
        //void DeleteProduct(int id);

        Task<IEnumerable<Product>?> GetAllProductAsync();
        Task<Product>? GetById(int productId);
        Task CreateAsync(Product product);
        Task<IEnumerable<Product>?> GetProductByCategoryAsync(string category);
    }
}
