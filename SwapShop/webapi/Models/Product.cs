using System.Text.Json.Serialization;

namespace webapi.Models
{
    public class Product
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string Category { get; set; }
        public bool IsAvailable { get; set; }
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
