﻿using webapi.Models;

namespace Backend.Models.Repositories
{
    public interface IUser
    {

        //DELETE USER

        //Logout User

        IEnumerable<User> GetAllUsers();
        int CreateUser(User user);
        int LoginUser(string username, string password, string email);
        User GetById(int id);
    }
}