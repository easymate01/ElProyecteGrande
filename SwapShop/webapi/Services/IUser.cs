using webapi.DTOs;
using webapi.Models;

namespace webapi.Repositories
{
    public interface IUser
    {
        //DELETE USER
        //Logout User
        Task<IEnumerable<User>?> GetAllUsersAsync();
        Task<User> CreateUserAsync(UserDto user);
        Task<User>? LoginUserAsync(UserDto user);
        Task<User>? GetById(int userId);
        Task<User>? GetUserByNameAsync(string userName);

    }
}