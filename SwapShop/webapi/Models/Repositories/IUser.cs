using webapi.Models;

namespace Backend.Models.Repositories
{
    public interface IUser
    {

        //DELETE USER

        //Logout User

        //Logged-In
        IEnumerable<User> GetAllUsers();
        int CreateUser(User user);
        int LoginUser(string username, string password);
    }
}