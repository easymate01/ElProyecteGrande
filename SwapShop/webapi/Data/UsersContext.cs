using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using webapi.Models;

namespace webapi.Data
{
   
        public class UsersContext : IdentityDbContext<IdentityUser, IdentityRole, string>
        {
            public UsersContext(DbContextOptions<UsersContext> options)
            : base(options)
            {
            }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // It would be a good idea to move the connection string to user secrets
            options.UseSqlServer("Server=localhost,1433;Database=SwapShop;User Id=sa;Password=SaraAttila94;Encrypt=True;TrustServerCertificate=True;");

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
                base.OnModelCreating(modelBuilder);
            }
        }
    }

