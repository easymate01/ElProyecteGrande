namespace webapi.Services.Authentication
{
    public class GoogleAuthRequest
    {
        public string GoogleId { get; set; }
        public string Email { get; set; }
        public string GivenName { get; set; }
        public string FamilyName { get; set; }
    }

}
