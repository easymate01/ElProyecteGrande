namespace webapi.Models
{
    public class User
    {
        public ICollection<Product> Products { get; set; }
    }
}
