using webapi.DTOs;
using webapi.Models;
using Microsoft.AspNetCore.Identity;

namespace webapi.Repositories
{
    public interface IUser
    {
        //DELETE USER
        //Logout User
        Task<IdentityUser> UpdateUser(string userId, UserDto user);
        Task<IdentityUser> DeleteUser(string userId);
        Task<IEnumerable<IdentityUser>?> GetAllUsersAsync();
        Task<IdentityUser>? GetById(string userId);
        Task<IdentityUser>? GetUserByNameAsync(string userName);

    }
}