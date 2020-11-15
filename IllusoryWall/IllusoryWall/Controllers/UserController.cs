using System;
using System.Collections.Generic;
using System.Linq;
using System.Diagnostics;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Authentication.jw
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
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

        public UserController(IllusoryWallContext context)
        {
            _context = context;
        }

        [Route("Login")]
        [HttpPost]
        public IActionResult Login(User user)
        {
            User foundUser = _context.Users.Where(p => p.Username == user.Username).Single();

            if (foundUser == null)
                return BadRequest(new { message = "Incorrect Username" });

            string hashed = Convert.ToBase64String(
                KeyDerivation.Pbkdf2(
                    user.Password,
                    foundUser.Spice,
                    KeyDerivationPrf.HMACSHA512,
                    10000,
                    512 / 8));

            if (foundUser.Password != hashed)
                return BadRequest(new { message = "Incorrect Password" });

            return Ok();
        }

        [Route("Register")]
        [HttpPost]
        public IActionResult Register(User user)
        {
            return Ok();
        }
    }
}
