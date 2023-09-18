using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

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
            options.UseSqlServer("Server=tcp:swapshop.database.windows.net,1433;Initial Catalog=SwapShop;Persist Security Info=False;User ID=gulmatan;Password=a$%Jd5Ze!9+VwQea;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}

