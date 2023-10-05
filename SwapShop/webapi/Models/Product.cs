using System.Text.Json.Serialization;
using webapi.Models.Categoires;

namespace webapi.Models
{
    public class Product
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public bool IsAvailable { get; set; }
        public MainCategory MainCategory { get; set; }
        public Enum Subcategory { get; set; }
        public string ImageBase64 { get; set; }
        public string userId { get; set; }
        [JsonIgnore]
        public User User { get; set; }
        public Product()
        {
            Id = Guid.NewGuid().ToString();
            IsAvailable = true;
        }
    }
}
