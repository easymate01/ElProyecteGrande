using webapi.Models.Categoires;

namespace webapi.DTOs
{
    public class ProductDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public MainCategory MainCategory { get; set; }

        public string SubCategory { get; set; }
        public string ImageBase64 { get; set; }
        public string userId { get; set; }
    }
}
