using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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
        public IActionResult GetLists()
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
                Enemies = h.EnemyHitListJoins.Select(eh => new
                {
                    Id = eh.Enemy.Id,
                    Name = eh.Enemy.Name,
                    ImagePath = eh.Enemy.ImagePath
                }),
                Status = h.Status
            });

            return Ok(response);
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
                return BadRequest("There is no list with that ID that belongs to user");

            // Remove hitlist from user
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


            var hitlist = _context.HitLists
                .Add(new HitList() { Status = false })
                .Entity;

            // Generate random list of enemies and join with hitlist
            var enemies = _context.Enemies
                .Shuffle()
                .Take(size)
                .Select(e =>
                    _context.EnemyHitListJoins.Add(new EnemyHitListJoin()
                    {
                        Enemy = e,
                        EnemyId = e.Id,
                        HitList = hitlist,
                        HitListId = hitlist.Id
                    }).Entity
                )
                .ToList();

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
