using Microsoft.EntityFrameworkCore;
using webapi.Data;
using webapi.DTOs;
using webapi.Models;

namespace webapi.Repositories
{
    public class UserService : IUser
    {
        private readonly DataContext _dbContext;

        public UserService(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<User>?> GetAllUsersAsync()
        {
            return await _dbContext.Users.ToListAsync();
        }

        public async Task<User> CreateUserAsync(UserDto user)
        {
            var newUser = new User
            {
                Username = user.Username,
                Email = user.Email,
                Password = user.Password,
            };
            _dbContext.Users.Add(newUser);
            await _dbContext.SaveChangesAsync();
            return newUser;
        }

        public async Task<User>? LoginUserAsync(UserDto user)
        {
            return await _dbContext.Users
                .Where(users => user.Username == users.Username && user.Password == users.Password && user.Email == users.Email)
                .FirstOrDefaultAsync();
        }

        public async Task<User>? GetById(int userId)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(user => user.Id == userId);
        }

        public async Task<User>? GetUserByNameAsync(string userName)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(user => user.Username == userName);
        }
    }
}