using Microsoft.EntityFrameworkCore;
using webapi.Data;
using webapi.DTOs;
using webapi.Models;

namespace webapi.Repositories
{
    public class UserService :IUser
    {
        private readonly DataContext _dbContext;

        public UserService(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<User> UpdateUser(string userId, UserDto user)
        {
            var newUser = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == userId);
            if (newUser == null)
            {
                return null;
            }
            newUser.UserName = user.Username;
            newUser.Email = user.Email;

            _dbContext.Users.Update(newUser);
            await _dbContext.SaveChangesAsync();
            return newUser;

        }

        public async Task<User> DeleteUser(string userId)
        {
            var userToDelete = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == userId);
            if (userToDelete == null)
            {
                return null;
            }
            _dbContext.Users.Remove(userToDelete);
            await _dbContext.SaveChangesAsync();
            return userToDelete;
        }

        public async Task<IEnumerable<User>?> GetAllUsersAsync()
        {
            return await _dbContext.Users.ToListAsync();
        }


        public async Task<User>? GetById(string userId)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(user => user.Id == userId);
        }

        public async Task<User>? GetUserByNameAsync(string userName)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(user => user.UserName == userName);
        }
    }
}