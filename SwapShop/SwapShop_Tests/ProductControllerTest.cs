namespace SwapShop_Tests
{
    public class ProductControllerTest : WebApplicationFactory<Program>
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
        public async Task Return_Get_all_Endpoint()
        {
            var response = await _client.GetAsync("/products");
            response.EnsureSuccessStatusCode();
            var content = await response.Content.ReadAsStringAsync();
            Assert.NotNull(content);
            Assert.IsNotEmpty(content);
        }

        [Test]
        public async Task Get_ProductsByAvaiable_Return_true()
        {
            var response = await _client.GetAsync("/products/available");
            response.EnsureSuccessStatusCode();
            var content = await response.Content.ReadAsStringAsync();
            Assert.NotNull(content);
            Assert.IsNotEmpty(content);
        }

        [Test]
        public async Task Add_Product_Return_true()
        {
            ProductDto productDto = new ProductDto
            {
                Name = "Valami",
                Description = "Description",
                Price = 10,
                Category = "Car",
                ImageBase64 = "ggglglglgl",
                userId = "5cb76061-0423-44fe-81be-2516d3b0f179"
            };
            Product product = new Product
            {
                Name = productDto.Name,
                Description = productDto.Description,
                Price = productDto.Price,
                Category = productDto.Category,
                ImageBase64 = productDto.ImageBase64,
                userId = productDto.userId
            };

            var content = new StringContent(JsonConvert.SerializeObject(product), Encoding.UTF8, "application/json");


            var response = await _client.PostAsync("/create/product", content);
            response.EnsureSuccessStatusCode();
            var responseContent = await response.Content.ReadAsStringAsync();
            Assert.IsNotNull(responseContent);


        }

        [Test]
        public async Task Delete_Product_NonExistingProduct_ReturnsNotFound()
        {
            string productId = "invalidFakeId";

            var response = await _client.DeleteAsync($"/product/delete/{productId}");
            var responseContent = await response.Content.ReadAsStringAsync();

            // Check if the response status code indicates a non-success status (e.g., 404 Not Found).
            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);

            // Check the response content for a specific message.
            Assert.AreEqual("This product doesn't exist", responseContent);
        }

        [Test]
        public async Task GetProductById_NonExistingProduct_ReturnsNotFound()
        {
            string productId = "InvalidProductId";
            var response = await _client.GetAsync($"/product/{productId}");

            // Check if the response status code is 404 (Not Found)
            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);

            var responseContent = await response.Content.ReadAsStringAsync();
            Assert.AreEqual("Product doesn't exist!", responseContent);
        }

        [Test]
        public async Task GetProductByCategory_NonExistingProduct_ReturnsNotFound()
        {
            string category = "InvalidCategory";
            var response = await _client.GetAsync($"/products/{category}");

            // Check if the response status code is 404 (Not Found)
            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);

            var responseContent = await response.Content.ReadAsStringAsync();
            Assert.AreEqual("This product doesn't exist!", responseContent);
        }

    }
}


