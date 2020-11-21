using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Net;
using System.Runtime.CompilerServices;
using IllusoryWall.Data;
using IllusoryWall.Models;
using IllusoryWall.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace IllusoryWall.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HitListController : IWControllerBase
    {
        private readonly IllusoryWallContext _context;
        public IConfiguration Configuration { get; }

        public HitListController(IllusoryWallContext context, IConfiguration configuration)
        {
            _context = context;
            Configuration = configuration;
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetHitlists()
        {
            // Get authenticated user from database
            var user = _context.Users
                .FirstOrDefault(u => u.Username == Username());

            if (user == null)
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    "Unable to resolve user");

            // Get all hitlists that belong to the user
            var hitlists = user.Hitlists;

            // Map hitlists to condensed response
            var response = hitlists.Select(h => new
            {
                Id = h.Id,
                Enemies = h.Enemies.Select(e => new
                {
                    Id = e.Id,
                    Name = e.Name,
                    ImagePath = e.ImagePath
                }),
                Status = h.Status
            });

            return Ok(hitlists);
        }

        [Authorize]
        [HttpDelete]
        [Route("{listId}")]
        public IActionResult DeleteList(int listId)
        {
            // Get authenticated user from database
            var user = _context.Users
                .FirstOrDefault(u => u.Username == Username());

            if (user == null)
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    "Unable to resolve user");

            // Find hitlist with ID if it belongs to the user
            var hitlist = user.Hitlists.FirstOrDefault(h => h.Id == listId);
            if (hitlist == null)
                return BadRequest("Specified list does not belong to user");

            // Remove hitlist
            user.Hitlists.Remove(hitlist);

            // Commit changes to database
            try
            {

                if (_context.SaveChanges() > 0)
                    return Ok();
            }
            catch (System.Exception oops)
            {
                Console.Write("\n" + oops.ToString() + "\n\n");
            }

            return StatusCode((int)HttpStatusCode.InternalServerError);
        }

        [Authorize]
        [HttpPost]
        [Route("Create")]
        public IActionResult CreateList([FromQuery] int size = 8)
        {
            // Get authenticated user from database
            var user = _context.Users
                .FirstOrDefault(u => u.Username == Username());

            if (user == null)
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    "Unable to resolve user");

            // Verify that size is valid
            int enemyTableSize = _context.Enemies.Count();
            if (size > enemyTableSize)
                return StatusCode((int)HttpStatusCode.RequestedRangeNotSatisfiable,
                    "More enemies requested than available");

            // Generate random list of enemies
            ICollection<Enemy> enemies = _context.Enemies
                .Shuffle()
                .Take(size)
                .ToList();

            // Create new hitlist with enemies
            var hitlist = new HitList()
            {
                Enemies = enemies,
                Status = false
            };

            // Add hitlist to user
            if (user.Hitlists == null)
            {
                user.Hitlists = new List<HitList>();
            }
            user.Hitlists.Add(hitlist);

            // Commit changes to database
            try
            {
                if (_context.SaveChanges() > 0)
                    return Ok();
            }
            catch (System.Exception oops)
            {
                Console.Write("\n" + oops.ToString() + "\n\n");
            }

            return StatusCode((int)HttpStatusCode.InternalServerError);
        }
    }
}
