namespace webapi.Models.Repositories
{
    public interface IProduct
    {
        IEnumerable<Product> GetAllProducts();
        int CreateProduct(Product product);
        Product GetProductById(int id);
        IEnumerable<Product> GetProductsByCategory(string category);
        

        //int UpdateProduct(Product product);

        //void DeleteProduct(int id);
    }
}
