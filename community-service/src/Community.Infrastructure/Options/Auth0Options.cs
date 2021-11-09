namespace Community.Infrastructure.Options
{
    public class Auth0Options
    {
        public const string Auth0 = "Auth0";
        
        public string Domain { get; set; }
        public string Audience { get; set; }
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public string DatabaseConnection { get; set; }
    }
}
