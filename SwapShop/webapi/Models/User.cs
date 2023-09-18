using Microsoft.AspNetCore.Identity;

namespace webapi.Models
{
    public class User : IdentityUser
    {
        
        public ICollection<Product> Products { get; set; }
    }
}
