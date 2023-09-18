using Microsoft.EntityFrameworkCore;
using webapi.Models;

namespace webapi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // It would be a good idea to move the connection string to user secrets
            options.UseSqlServer(
                "Server=tcp:swapshop.database.windows.net,1433;Initial Catalog=SwapShop;Persist Security Info=False;User ID=gulmatan;Password=a$%Jd5Ze!9+VwQea;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Product>()
                .HasOne(c => c.User)
                .WithMany(ss => ss.Products)
                .HasForeignKey(ss => ss.userId);
        }
    }
}