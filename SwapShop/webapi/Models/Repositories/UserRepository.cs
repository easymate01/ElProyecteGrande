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
            _connection.Open();
            int userId = -1;
            using (var cmd = new NpgsqlCommand(
               "SELECT id FROM users WHERE username = @username AND password = @password",
               _connection
               ))
            {
                cmd.Parameters.AddWithValue("username", username);
                cmd.Parameters.AddWithValue("password", password);

                var result = cmd.ExecuteScalar();
                if (result != null)
                {
                    userId = (int)result;
                }

            }
            _connection.Close();
            return userId;
        }


        public User GetById(int id)
        {
            _connection.Open();
            User user = new User();


            using (var cmd = new NpgsqlCommand(
                       "SELECT id, username, email, birthdate FROM users WHERE id = (@id)",
                       _connection
                   ))
            {
                cmd.Parameters.AddWithValue("id", id);

                using (var reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        user.Id = reader.GetInt32(reader.GetOrdinal("id"));
                        user.Username = reader.GetString(reader.GetOrdinal("username"));
                        user.Email = reader.GetString(reader.GetOrdinal("email"));
                        user.BirthDate = reader.GetDateTime(reader.GetOrdinal("birthdate"));
                    }
                }
            }
            _connection.Close();
            return user;
        }
    }
}
