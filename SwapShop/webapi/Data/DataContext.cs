using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using webapi.Models;

namespace webapi.Data
{
    public class DataContext : IdentityDbContext<IdentityUser, IdentityRole, string>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // It would be a good idea to move the connection string to user secrets
            options.UseSqlServer(
                "Server=localhost,1433;Database=SwapShop;User Id=sa;Password=yourStrong(!)Password;Encrypt=True;TrustServerCertificate=True;");

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>()
                .HasOne(c => c.User)
                .WithMany(ss => ss.Products)
                .HasForeignKey(ss => ss.userId);

            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<User>()
                .HasOne(u => u.IdentityUser)
                .WithMany()
                .HasForeignKey(p => p.IdentityUserId)
                .IsRequired(false);
        }
    }
}