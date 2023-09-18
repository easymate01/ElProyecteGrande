using Microsoft.AspNetCore.Identity;

namespace webapi.Services.Authentication
{
    public interface ITokenService
    {
         string CreateToken(IdentityUser user, string role);
    }
}
