using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace IllusoryWall.Utils
{
    public static class AccountType
    {
        public const string Admin = "admin";
        public const string General = "general";
    }

    public class IWControllerBase : ControllerBase
    {
        public bool IsAdmin()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null) throw new InvalidJWTException();

            var accountTypeClaim = identity.FindFirst("Account Type");
            if (accountTypeClaim == null) throw new InvalidJWTException();

            if (accountTypeClaim.Value == AccountType.Admin) return true;
            if (accountTypeClaim.Value == AccountType.General) return false;
            throw new InvalidJWTException();
        }

        public bool IsUser(string username)
        {
            string usernameClaim = Username();

            if (usernameClaim == username) return true;
            else return false;
            throw new InvalidJWTException();
        }

        public string Username()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null) throw new InvalidJWTException();

            var usernameClaim = identity.FindFirst("Username");
            if (usernameClaim == null) throw new InvalidJWTException();

            return usernameClaim.Value;
        }
    }

    [System.Serializable]
    public class InvalidJWTException : System.Exception
    {
        public InvalidJWTException() { }
        public InvalidJWTException(string message) : base(message) { }
        public InvalidJWTException(string message, System.Exception inner) : base(message, inner) { }
        protected InvalidJWTException(
            System.Runtime.Serialization.SerializationInfo info,
            System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }
}
