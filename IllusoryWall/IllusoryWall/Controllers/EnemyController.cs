using System;
using System.Collections.Generic;
using System.Linq;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using IllusoryWall.Data;
using IllusoryWall.Models;

namespace IllusoryWall.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EnemyController : ControllerBase
    {
        private readonly IllusoryWallContext _context;

        public EnemyController()
        {
            _context = new IllusoryWallContext();
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetEnemy(int id)
        {
            // get results
            Enemy enemy = _context.Enemies.Find(id);

            // if no results return with 404
            if (enemy == null)
                return NotFound();

            // if results return json with 200
            return Ok(enemy);
        }

        [HttpPost]
        [Route("Add")]
        public IActionResult AddEnemy(Enemy enemy)
        {

            // add enemy and save changes
            _context.Enemies.Add(enemy);

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

        [HttpDelete]
        [Route("Remove/{id}")]
        public IActionResult RemoveEnemy(int id)
        {
            // add enemy and save changes
            Enemy enemy = _context.Enemies.Find(id);

            if (enemy == null)
                return StatusCode(404);

            _context.Enemies.Remove(enemy);

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

        [HttpPut]
        [Route("Update/{id}")]
        public IActionResult UpdateEnemy(Enemy newEnemy, int id)
        {
            // get outdated enemy entry
            Enemy enemy = _context.Enemies.Find(id);

            // add the old enemy id to the new one
            newEnemy.Id = id;

            // remove old enemy entry
            _context.Enemies.Remove(enemy);

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

            // add new enemy
            // do the delete and reinsert in separate saves or else the context registers it as trying to duplicate primary keys
            _context.Enemies.Add(newEnemy);

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
        [Route("All")]
        public EnemyEntry[] GetAllEnemyAsEntries()
        {
            return _context.Enemies
                .Select(enemy => new EnemyEntry()
                {
                    Name = enemy.Name,
                    Id = enemy.Id
                })
                .ToArray();
        }

        [HttpGet]
        [Route("Search/Enemy")]
        public IActionResult SearchEnemy([FromQuery] string att = null, [FromQuery] string keyword = null, [FromQuery] Nullable<bool> respawns = null, [FromQuery] string type = null)
        {
            //Enemies:   Respawns, Class
            //Locations: Names, HP, Souls
            //Drops:     Name, Rate, Location
            //Damages:   DamageType, Category

            if(att != null)
                att = att.ToLower();
            if(type != null)
                type = type.ToLower();

            switch (att)
            {
                
                case "name":
                    if(keyword == null)
                    {
                        Console.Write("ERROR: keyword can't be null in a name search! \n");
                        return BadRequest();
                    }

                    return Ok(_context.Enemies.Where(e => EF.Functions.Like(e.Name, $"%{keyword}%"))
                        .Select(e => new EnemyEntry()
                        {
                            Id = e.Id,
                            Name = e.Name
                        }));
                case "respawns":
                    return Ok(_context.Enemies.Where(e => e.Respawns == respawns)
                        .Select(e => new EnemyEntry()
                        {
                            Id = e.Id,
                            Name = e.Name
                        }));
                case "class":
                    if(type == "npc" || type == "generic" || type == "boss" || type == "invader" || type == null)
                    {
                        return Ok(_context.Enemies.Where(e => e.Class == type)
                            .Select(e => new EnemyEntry()
                            {
                                Id = e.Id,
                                Name = e.Name
                            }));
                    }
                    return BadRequest();
            }

            return Ok();
        }
    }
}
