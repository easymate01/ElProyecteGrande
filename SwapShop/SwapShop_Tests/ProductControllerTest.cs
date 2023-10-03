using System.Net.Http.Headers;
using System.Text.Json;
using webapi.Services.Authentication;
using JsonSerializer = Newtonsoft.Json.JsonSerializer;

namespace SwapShop_Tests
{
    public class ProductControllerTest
    {
        private HttpClient _client;

        public void Setup()
        {
            string connectionString = "Server=tcp:swapshop.database.windows.net,1433;Initial Catalog=SwapShop;Persist Security Info=False;User ID=gulmatan;Password=a$%Jd5Ze!9+VwQea;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
            Environment.SetEnvironmentVariable("CONNECTION_STRING", connectionString);
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            _client = new HttpClient();
            var authRequest = new AuthRequest("admin@admin.com", "admin123");
            var jsonString = JsonSerializer.Serialize(authRequest);
            StringContent jsonStringContent = new StringContent(jsonString);
            jsonStringContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            var response = _client.PostAsync("Auth/Login", jsonStringContent).Result;
            var content = response.Content.ReadAsStringAsync().Result;
            var desContent = JsonSerializer.Deserialize<AuthResponse>(content, options);
            var token = desContent.Token;
            _client.DefaultRequestHeaders.Add("Authorization", $"Bearer {token}");
        }

        [OneTimeTearDown]
        public void TearDown()
        {
            _client.Dispose();
        }
    }
}

