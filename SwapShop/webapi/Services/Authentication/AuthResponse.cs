namespace webapi.Services.Authentication
{
    public record AuthResponse(string Id, string Email, string UserName, string Token);
}
