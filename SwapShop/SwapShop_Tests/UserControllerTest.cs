namespace SwapShop_Tests
{
    public class UserControllerTest : WebApplicationFactory<Program>
    {
        private HttpClient _client;
        private IAuthService _authService;

        [SetUp]
        public void Setup()
        {
            string connectionString = "Server=tcp:swapshop.database.windows.net,1433;Initial Catalog=SwapShop;Persist Security Info=False;User ID=gulmatan;Password=a$%Jd5Ze!9+VwQea;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
            Environment.SetEnvironmentVariable("CONNECTION_STRING", connectionString);
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            _client = CreateClient();

            AuthRequest authRequest = new AuthRequest("admin@admin1.com", "admin1234");
            string jsonString = JsonSerializer.Serialize(authRequest);
            StringContent jsonStringContent = new StringContent(jsonString);
            jsonStringContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            var response = _client.PostAsync("/Login", jsonStringContent).Result;
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

        [Test]
        public async Task Return_Get_AllUsers_Endpoint()
        {
            var response = await _client.GetAsync("/users");
            response.EnsureSuccessStatusCode();
            var content = await response.Content.ReadAsStringAsync();
            Assert.NotNull(content);
            Assert.IsNotEmpty(content);
        }

        [Test]
        public async Task GetUserById_NonExistingUser_ReturnsNotFound()
        {
            string fakeInvalidId = "fakeInvalidId";
            var response = await _client.GetAsync($"/user/{fakeInvalidId}");

            // Check if the response status code is 404 (Not Found)
            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);

            var responseContent = await response.Content.ReadAsStringAsync();
            Assert.AreEqual("This user doesn't exsist!", responseContent);
        }

        [Test]
        public async Task Delete_User_NonExistingProduct_ReturnsNotFound()
        {
            string fakeInvalidId = "invalidFakeId";

            var response = await _client.DeleteAsync($"/user/delete/{fakeInvalidId}");
            var responseContent = await response.Content.ReadAsStringAsync();

            // Check if the response status code indicates a non-success status (e.g., 404 Not Found).
            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);

            // Check the response content for a specific message.
            Assert.AreEqual("This user doesn't exist", responseContent);
        }
    }
}
