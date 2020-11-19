using System;
using System.Text;
using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Linq;
using System.Diagnostics;
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

        [HttpPost]
        [Route("Login")]
        public IActionResult Login(UserAuthenticate user)
        {
            User foundUser = _context.Users.Where(p => p.Username == user.Username).Single();

            if (foundUser == null)
                return BadRequest(new { message = "Incorrect Username" });

            string hashed = Convert.ToBase64String(
                KeyDerivation.Pbkdf2(
                    user.Password,
                    Convert.FromBase64String(foundUser.Spice),
                    KeyDerivationPrf.HMACSHA512,
                    10000,
                    512 / 8));

            if (foundUser.Password != hashed)
                return BadRequest(new { message = "Incorrect Password" });

            // Create JWT
            var secretKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(Configuration.GetValue<string>("SecretKey")));
            var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            JwtSecurityToken tokenOptions;
            if (foundUser.Type == 'a')
            {
                tokenOptions = new JwtSecurityToken(
                    issuer: Configuration.GetValue<string>("ValidIssuer"),
                    audience: Configuration.GetValue<string>("ValidAudience"),

                    claims: new List<Claim>() { new Claim("Username", foundUser.Username), new Claim("Account Type", "admin") },

                    expires: DateTime.Now.AddYears(1),
                    signingCredentials: signingCredentials
                );
            }
            else
            {
                tokenOptions = new JwtSecurityToken(
                    issuer: Configuration.GetValue<string>("ValidIssuer"),
                    audience: Configuration.GetValue<string>("ValidAudience"),

                    claims: new List<Claim>() { new Claim("Username", foundUser.Username), new Claim("Account Type", "general") },

                    expires: DateTime.Now.AddYears(1),
                    signingCredentials: signingCredentials
                );
            }

            // Return stringified JWT to client
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            return Ok(new { Username = user.Username, Token = tokenString });
        }

        [HttpPost]
        [Route("Register")]
        public IActionResult Register(UserAuthenticate user)
        {
            if (_context.Users.Where(u => u.Username == user.Username).Any())
            {
                return Unauthorized("An account with that username already exists");
            }

            User newUser = new User();
            newUser.Username = user.Username;

            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            string hashedPass = Convert.ToBase64String(
                KeyDerivation.Pbkdf2(
                    user.Password,
                    salt,
                    KeyDerivationPrf.HMACSHA512,
                    10000,
                    512 / 8));
            newUser.Password = hashedPass;
            newUser.Spice = Convert.ToBase64String(salt);
            newUser.Type = 'g';

            _context.Users.Add(newUser);
            int count;

            try
            {
                count = _context.SaveChanges();
            }
            catch (System.Exception oops)
            {
                Console.Write("\n" + oops.ToString() + "\n\n");
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }

            // if changes occurred it worked, else something went wrong
            if (count > 0)
                return Ok(newUser);
            return StatusCode((int)HttpStatusCode.InternalServerError);
        }
    }
}
