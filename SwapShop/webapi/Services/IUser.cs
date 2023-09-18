using webapi.DTOs;
using webapi.Models;

namespace webapi.Repositories
{
    public interface IUser
    {
        //DELETE USER
        //Logout User
        Task<User> UpdateUser(string userId, UserDto user);
        Task<User> DeleteUser(string userId);
        Task<IEnumerable<User>?> GetAllUsersAsync();
        Task<User>? GetById(string userId);
        Task<User>? GetUserByNameAsync(string userName);

    }
}