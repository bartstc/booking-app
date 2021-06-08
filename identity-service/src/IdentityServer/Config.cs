using System.Collections.Generic;
using IdentityServer4;
using IdentityServer4.Models;

namespace IdentityServer
{
    public class Config
    {
        public static IEnumerable<IdentityResource> IdentityResources =>
            new IdentityResource[]
            { 
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResource(
                    "contexttype",
                    "Your account type",
                    new[] { "contextType" }
                ),
                new IdentityResource(
                    "facilityid",
                    "Identifier of Your facility",
                    new[] { "facilityId" }
                )
            };

        public static IEnumerable<ApiScope> ApiScopes =>
            new List<ApiScope>
            {
                new ApiScope("api1", "My API"),
                new ApiScope("gatewayapi", "Gateway API scope"),
                new ApiScope("accessibilityapi", "Accessibility API scope")
            };
        
        public static IEnumerable<ApiResource> ApiResources =>
            new ApiResource[] {
                new ApiResource(
                    "accessibilityapi",
                    "Accessibility API",
                    new [] { "contextType", "facilityId" })
                    {
                        Scopes = { "accessibilityapi" },
                        ApiSecrets = { new Secret("apisecret".Sha256()) }
                    }
            };

        public static IEnumerable<Client> Clients =>
            new List<Client>
            {
                new Client
                {
                    // AllowOfflineAccess = true,
                    ClientName = "Employee Web Client",
                    ClientId = "employeewebclient",
                    AllowedGrantTypes = GrantTypes.Code,
                    RequirePkce = true,
                    AllowedCorsOrigins = new List<string> {
                        "http://localhost:3001"
                    },
                    RedirectUris = new List<string>()
                    {
                        "http://localhost:3001/dashboard"
                    },
                    PostLogoutRedirectUris = new List<string>()
                    {
                        "https://localhost:5002/signout-callback-oidc"
                    },
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "gatewayapi",
                        "accessibilityapi",
                        "contexttype",
                        "facilityid"
                    },
                    ClientSecrets =
                    {
                        new Secret("secret".Sha256())
                    }
                },
                new Client
                {
                    // AllowOfflineAccess = true,
                    ClientName = "Test Client",
                    ClientId = "testclient",
                    AllowedGrantTypes = GrantTypes.Code,
                    RequirePkce = true,
                    AllowedCorsOrigins = new List<string> {
                        "http://localhost:3001"
                    },
                    RedirectUris = new List<string>()
                    {
                        "https://localhost:5001"
                    },
                    PostLogoutRedirectUris = new List<string>()
                    {
                        "https://localhost:5002/signout-callback-oidc"
                    },
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "gatewayapi",
                        "accessibilityapi",
                        "contexttype",
                        "facilityid"
                    },
                    ClientSecrets =
                    {
                        new Secret("secret".Sha256())
                    }
                },
                new Client
                {
                    ClientId = "client2",

                    AllowedGrantTypes = GrantTypes.ClientCredentials,

                    ClientSecrets =
                    {
                        new Secret("secret".Sha256())
                    },

                    AllowedScopes = { "api1" }
                },
                new Client
                {
                    ClientId = "mvc",
                    ClientSecrets = { new Secret("secret".Sha256()) },

                    AllowedGrantTypes = GrantTypes.Code,
                    RequirePkce = true,

                    // where to redirect to after login
                    RedirectUris = { "https://localhost:5002/signin-oidc" },

                    // where to redirect to after logout
                    PostLogoutRedirectUris = { "https://localhost:5002/signout-callback-oidc" },

                    AllowOfflineAccess = true,

                    AllowedScopes = new List<string>
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "api1",
                        "contextType"
                    }
                }
            };
    }
}
