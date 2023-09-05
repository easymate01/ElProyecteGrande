using Backend.Models.Repositories;
using Microsoft.EntityFrameworkCore;
using webapi.Data;
using webapi.DTOs;

namespace webapi.Models.Repositories
{
    public class UserRepository : IUser
    {
        public async Task<IEnumerable<User>?> GetAllUsersAsync()
        {
            using var dbContext = new DataContext();
            return await dbContext.Users
                .ToListAsync();
        }

        public async Task CreateUserAsync(UserDto user)
        {
            using var dbContext = new DataContext();
            var newUser = new User
            {
                Username = user.Username,
                Email = user.Email,
                Password = user.Password,
            };
            dbContext.Users.Add(newUser);
            await dbContext.SaveChangesAsync();
        }

        public async Task<User>? LoginUserAsync(UserDto user)
        {
            using var dbContext = new DataContext();
            return await dbContext.Users
                .Where(users => user.Username == users.Username && user.Password == users.Password && user.Email == users.Email)
                .FirstOrDefaultAsync();
        }

        public async Task<User>? GetById(int userId)
        {
            using var dbContext = new DataContext();
            return await dbContext.Users
                .FirstOrDefaultAsync(user => user.Id == userId);
        }
        public async Task<User>? GetUserByNameAsync(string userName)
        {
            using var dbContext = new DataContext();
            return await dbContext.Users
                .FirstOrDefaultAsync(user => user.Username == userName);
        }
    }
}
