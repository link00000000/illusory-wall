using System;
using System.Text;
using System.Collections.Generic;
using System.Security.Claims;
using System.Linq;
using System.Diagnostics;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using IllusoryWall.Data;
using IllusoryWall.Models;

namespace IllusoryWall.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IllusoryWallContext _context;
        public IConfiguration Configuration { get; }

        public UserController(IllusoryWallContext context, IConfiguration configuration)
        {
            _context = context;
            Configuration = configuration;
        }

        [Route("Login")]
        [HttpPost]
        public IActionResult Login(UserAuthenticate user)
        {
            User foundUser = _context.Users.Where(p => p.Username == user.Username).Single();

            if (foundUser == null)
                return BadRequest(new { message = "Incorrect Username" });

            string hashed = Convert.ToBase64String(
                KeyDerivation.Pbkdf2(
                    user.Password,
                    Encoding.UTF8.GetBytes(foundUser.Spice),
                    KeyDerivationPrf.HMACSHA512,
                    10000,
                    512 / 8));

            if (foundUser.Password != hashed)
                return BadRequest(new { message = "Incorrect Password" });

            // Create JWT
            var secretKey = new SymmetricSecurityKey( // This value MUST match the same value in Startup.cs
                Encoding.UTF8.GetBytes(Configuration.GetValue<string>("SecretKey")));
            var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var tokenOptions = new JwtSecurityToken(
                issuer: Configuration.GetValue<string>("ValidIssuer"), // Must match Startup.cs
                audience: Configuration.GetValue<string>("ValidAudience"), // Must match Startup.cs

                // Store the username as a JWT Claim (refer to RFC Specification: https://tools.ietf.org/html/rfc7519#section-4)
                claims: new List<Claim>() { new Claim("Username", user.Username) },

                // I made this value really long so the token wont expire, this way we dont have to worry about refreshing tokens
                expires: DateTime.Now.AddYears(1),
                signingCredentials: signingCredentials
            );

            // Return stringified JWT to client
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            return Ok(new { Username = user.Username, Token = tokenString });
        }

        [Route("Register")]
        [HttpPost]
        public IActionResult Register(User user)
        {
            return Ok();
        }
    }
}
