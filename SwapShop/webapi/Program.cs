using Backend.Models.Repositories;
using webapi.Models.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddTransient<IProduct, ProductRepository>();
builder.Services.AddTransient<IUser, UserRepository>();

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

app.MapControllers();

app.Run();
