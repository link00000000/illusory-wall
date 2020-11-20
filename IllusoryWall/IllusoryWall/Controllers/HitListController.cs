using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using IllusoryWall.Data;
using IllusoryWall.Models;
using IllusoryWall.Utils;

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

        [HttpGet]
        [Route("Get/{user}")]
        public IActionResult GetList(int user)
        {
            var results = _context.HitLists.Where(p => p.User.Id == user);
            if (results == null)
                return NotFound();

            return Ok(results);
        }

        [HttpGet]
        [Route("Delete/{user}")]
        public IActionResult DeleteList(int user)
        {
            var results = _context.HitLists.Where(p => p.User.Id == user);
            if (results == null)
                return NotFound();

            _context.HitLists.RemoveRange(results);
            int count;

            try
            {
                count = _context.SaveChanges();
            }
            catch (System.Exception oops)
            {
                Console.Write("\n" + oops.ToString() + "\n\n");
                return StatusCode(500);
            }

            // if changes occurred it worked, else something went wrong
            if (count > 0)
                return Ok();

            return StatusCode(500);
        }

        [HttpGet]
        [Route("Create/{user}")]
        public IActionResult CreateList(int user, [FromQuery] int size = 8)
        {
            int enemyTableSize = _context.Enemies.Count();
            if (size > enemyTableSize)
                return BadRequest(new { message = "Not enough entries in the enemies table" });

            User userEntry = _context.Users.Find(user);

            List<int> enemyIDs = _context.Enemies.Select(p => p.Id).ToList<int>();
            List<int> hitlistEnemies = new List<int>();
            int index;
            Random rand = new Random();
            for (int i = 0; i < size; ++i)
            {
                index = rand.Next(0, enemyIDs.Count() - 1);
                hitlistEnemies.Add(enemyIDs[index]);
                enemyIDs.RemoveAt(index);
            }

            List<HitList> final = new List<HitList>();
            HitList item = new HitList();
            for (int i = 0; i < size; ++i)
            {
                item.User = userEntry;
                item.Enemy = _context.Enemies.Find(hitlistEnemies[i]);
                item.Status = false;
                final.Add(item);
            }

            _context.HitLists.AddRange(final);
            int count;
            try
            {
                count = _context.SaveChanges();
            }
            catch (System.Exception oops)
            {
                Console.Write("\n" + oops.ToString() + "\n\n");
                return StatusCode(500);
            }

            // if changes occurred it worked, else something went wrong
            if (count > 0)
                return Ok(new { message = "Hitlist Created" });

            return StatusCode(500);
        }
    }
}
