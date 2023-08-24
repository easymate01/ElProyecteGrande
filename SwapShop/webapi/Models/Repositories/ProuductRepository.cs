using Npgsql;

namespace webapi.Models.Repositories
{
    public class ProuductRepository : IProduct
    {
        private readonly NpgsqlConnection _connection;

        public ProuductRepository(NpgsqlConnection connection)
        {
            _connection = connection;
        }
        public IEnumerable<Product> GetAllProducts()
        {
            _connection.Open();
            List<Product> products = new List<Product>();

            using (var cmd = new NpgsqlCommand(
                       "SELECT * FROM products",
                       _connection))
            {
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var product = new Product
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("id")),
                            Name = reader.GetString(reader.GetOrdinal("name")),
                            Description = reader.GetString(reader.GetOrdinal("description")),
                            Category = reader.GetString(reader.GetOrdinal("category")),
                            Price = reader.GetDecimal(reader.GetOrdinal("price")),
                            userID = reader.GetInt32(reader.GetOrdinal("userid")),
                        };
                        products.Add(product);
                    }
                }

            }
            _connection.Close();
            return products;
        }


        public int CreateProduct(Product product)
        {
            _connection.Open();
            int lastInsertId;

            using (var cmd = new NpgsqlCommand(
                       "INSERT INTO products (name, description, price, category, userid) VALUES (@name, @description, @price, @category, @userid) RETURNING id",
                       _connection
                   ))
            {
                cmd.Parameters.AddWithValue("name", product.Name);
                cmd.Parameters.AddWithValue("description", product.Description);
                cmd.Parameters.AddWithValue("price", product.Price);
                cmd.Parameters.AddWithValue("category", product.Category);
                cmd.Parameters.AddWithValue("userid", product.userID);

                lastInsertId = (int)cmd.ExecuteScalar();
            }

            _connection.Close();
            return lastInsertId;

        }

        public Product GetProductById(int id)
        {
            _connection.Open();
            Product product = new Product();

            using (var cmd = new NpgsqlCommand(
                       "SELECT * FROM products WHERE id = (@id)",
                       _connection
                   ))
            {
                cmd.Parameters.AddWithValue("id", id);

                using (var reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        product.Id = reader.GetInt32(reader.GetOrdinal("id"));
                        product.Name = reader.GetString(reader.GetOrdinal("name"));
                        product.Description = reader.GetString(reader.GetOrdinal("description"));
                        product.Price = reader.GetDecimal(reader.GetOrdinal("price"));
                        product.Category = reader.GetString(reader.GetOrdinal("category"));
                        product.userID = reader.GetInt32(reader.GetOrdinal("userid"));

                    }
                }
            }
            _connection.Close();
            return product;
        }

        public IEnumerable<Product> GetProductsByCategory(string category)
        {
            _connection.Open();
            List<Product> products = new List<Product>();

            using (var cmd = new NpgsqlCommand(
                       "SELECT * FROM products WHERE category = (@category)",
                       _connection))
            {
                cmd.Parameters.AddWithValue("category", category);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var product = new Product
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("id")),
                            Name = reader.GetString(reader.GetOrdinal("name")),
                            Description = reader.GetString(reader.GetOrdinal("description")),
                            Category = reader.GetString(reader.GetOrdinal("category")),
                            Price = reader.GetDecimal(reader.GetOrdinal("price")),
                            userID = reader.GetInt32(reader.GetOrdinal("userid"))

                        };
                        products.Add(product);
                    }
                }

            }
            _connection.Close();
            return products;
        }

    }
}

