using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using webapi.Data;
using webapi.DTOs;

namespace webapi.Repositories
{
    public class UserService : IUser
    {
        private readonly DataContext _dbContext;
        private readonly UserManager<IdentityUser> _userManager;
        public UserService(DataContext dbContext, UserManager<IdentityUser> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }

        public async Task<IdentityUser> UpdateUser(string userId, UserDto user)
        {
            var newUser = await _userManager.FindByIdAsync(userId);
            var dbContextUser = await _dbContext.Users.FirstOrDefaultAsync(user => user.IdentityUserId == userId);

            if (newUser == null)
            {
                return null;
            }

            newUser.UserName = user.Username;
            newUser.Email = user.Email;



            dbContextUser.UserName = user.Username;
            dbContextUser.Email = user.Email;






            var result = await _userManager.UpdateAsync(newUser);
            _dbContext.Users.Update(dbContextUser);
            _dbContext.SaveChanges();



            if (result.Succeeded)
            {
                return newUser;
            }
            else
            {
                // A felhasználó frissítése sikertelen volt
                // Kezelheted a hibákat itt
                return null;
            }
        }


        public async Task<IdentityUser> DeleteUser(string userId)
        {
            var userToDelete = await _userManager.FindByIdAsync(userId);
            var dbContextUser = await _dbContext.Users.FirstOrDefaultAsync(user => user.IdentityUserId == userId);


            if (userToDelete == null)
            {
                return null;
            }
            await _userManager.DeleteAsync(userToDelete);

            _dbContext.Users.Remove(dbContextUser);
            _dbContext.SaveChanges();

            return userToDelete;
        }


            public async Task<IEnumerable<IdentityUser>?> GetAllUsersAsync()
        {
            return await _userManager.Users.ToListAsync();
        }


        public async Task<IdentityUser>? GetUserByNameAsync(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            if (user == null)
            {
                return null;
            }

            return user;
        }

        public async Task<IdentityUser> GetById(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return null;
            }

            return user;
        }

    }
}