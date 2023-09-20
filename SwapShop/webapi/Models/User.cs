using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;

namespace webapi.Models
{
    public class User
    {
        public string Id { get; init; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string IdentityUserId { get; set; }

        public ICollection<Product> Products { get; set; }

        [JsonIgnore]
        public IdentityUser IdentityUser { get; set; }
        public User()
        {
            Id = Guid.NewGuid().ToString();
        }

    }
}
