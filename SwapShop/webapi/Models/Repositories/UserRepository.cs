using Backend.Models.Repositories;
using Npgsql;

namespace webapi.Models.Repositories
{
    public class UserRepository : IUser
    {
        private readonly NpgsqlConnection _connection;

        public UserRepository(NpgsqlConnection connection)
        {
            _connection = connection;
        }

        public IEnumerable<User> GetAllUsers()
        {
            throw new NotImplementedException();
        }

        public int CreateUser(User user)
        {
            _connection.Open();
            int lastInsertId;

            using (var cmd = new NpgsqlCommand(
                       "INSERT INTO users (username, email, password, birthdate) VALUES (@username, @email, @password, @birthdate) RETURNING id",
                       _connection
                   ))
            {
                cmd.Parameters.AddWithValue("username", user.Username);
                cmd.Parameters.AddWithValue("email", user.Email);
                cmd.Parameters.AddWithValue("password", user.Password);
                cmd.Parameters.AddWithValue("birthdate", user.BirthDate);

                lastInsertId = (int)cmd.ExecuteScalar();
            }

            _connection.Close();
            return lastInsertId;
        }

        public int LoginUser(string username, string password)
        {
            throw new NotImplementedException();
        }
    }
}
