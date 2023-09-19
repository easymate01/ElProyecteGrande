using System.ComponentModel.DataAnnotations;

namespace webapi.Contracts
{
   
    public record RegistrationRequest(
    [Required] string Email,
    [Required] string Username,
    [Required] string Password);
    
    
}
