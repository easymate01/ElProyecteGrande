using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SolarWatch.Services.Authentication;
using System.Numerics;
using System.Text;
using webapi.Data;
using webapi.Models;
using webapi.Repositories;



var builder = WebApplication.CreateBuilder(args);
AddAuthentication();
AddIdentity();

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IAuthService, AuthService>();

builder.Services.AddTransient<IProduct, ProductService>();
builder.Services.AddTransient<IUser, UserService>();

builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});


var app = builder.Build();

// Configure CORS
app.UseCors(builder =>
{
    builder.AllowAnyOrigin(); // You can replace this with specific origins
    builder.AllowAnyHeader();
    builder.AllowAnyMethod();
});
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();

app.UseAuthorization();
app.UseAuthentication();
app.MapControllers();

app.Run();

void AddAuthentication()
{

    builder.Services
        .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters()
            {
                ClockSkew = TimeSpan.Zero,
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = "apiWithAuthBackend",
                ValidAudience = "apiWithAuthBackend",
                IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes("!SomethingSecret!")
                ),
            };
        });
}
    void AddIdentity()
    {
        builder.Services
         .AddIdentityCore<IdentityUser>(options =>
         {
             options.SignIn.RequireConfirmedAccount = false;
             options.User.RequireUniqueEmail = true;
             options.Password.RequireDigit = false;
             options.Password.RequiredLength = 6;
             options.Password.RequireNonAlphanumeric = false;
             options.Password.RequireUppercase = false;
             options.Password.RequireLowercase = false;
         })
         .AddRoles<IdentityRole>()
         .AddEntityFrameworkStores<DataContext>();
    }
