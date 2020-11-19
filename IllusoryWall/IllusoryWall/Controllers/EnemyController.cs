using System.Net;
using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using IllusoryWall.Data;
using IllusoryWall.Models;
using Microsoft.AspNetCore.Authorization;
using IllusoryWall.Utils;

namespace IllusoryWall.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EnemyController : IWControllerBase
    {
        private readonly IllusoryWallContext _context;

        public EnemyController(IllusoryWallContext context)
        {
            _context = context;
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

        [Authorize]
        [HttpPost]
        [Route("Add")]
        public IActionResult AddEnemy(Enemy enemy)
        {
            if (!IsAdmin())
            {
                return StatusCode((int)HttpStatusCode.Unauthorized);
            }

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

        [Authorize]
        [HttpDelete]
        [Route("Remove/{id}")]
        public IActionResult RemoveEnemy(int id)
        {
            if (!IsAdmin())
            {
                return StatusCode((int)HttpStatusCode.Unauthorized);
            }

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

        [Authorize]
        [HttpPut]
        [Route("Update/{id}")]
        public IActionResult UpdateEnemy(Enemy newEnemy, int id)
        {
            if (!IsAdmin())
            {
                return StatusCode((int)HttpStatusCode.Unauthorized);
            }

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
        [Route("Search")]
        public IActionResult SearchEnemy
        (
            [FromQuery] string name = null,
            [FromQuery(Name = "use_respawns")] bool useRespawns = false,
            [FromQuery] bool? respawns = null,
            [FromQuery(Name = "use_class")] bool useClass = false,
            [FromQuery] string classification = null,
            [FromQuery(Name = "hp_null")] bool HpNull = false,
            [FromQuery] int? hplt = null,
            [FromQuery] int? hpgt = null,
            [FromQuery] string locname = null,
            [FromQuery(Name = "souls_null")] bool SoulsNull = false,
            [FromQuery] int? soulslt = null,
            [FromQuery] int? soulsgt = null,
            [FromQuery] string dropname = null,
            [FromQuery] string droploc = null,
            [FromQuery(Name = "rate_null")] bool RateNull = false,
            [FromQuery] double? ratelt = null,
            [FromQuery] double? rategt = null,
            [FromQuery] string damagetype = null,
            [FromQuery] char? category = null
        )
        {
            bool send = false;

            var response = _context.Enemies.AsQueryable();

            // Enemies.Name
            if (name != null && name.Length > 0)
            {
                response = response.Where(e => e.Name.Contains(name));
                send = true;
            }

            // Enemies.Respawns
            if (useRespawns)
            {
                response = response.Where(e => e.Respawns == respawns);
                send = true;
            }

            // Enemies.Class
            if (useClass)
            {
                if (classification == "generic" || classification == "boss" || classification == "npc" || classification == "invader" || classification == null)
                {
                    response = response.Where(e => e.Class == classification);
                    send = true;
                }
                else
                {
                    Console.Write("WARNING: classification for search was ignored due to bad value!\n");
                }
            }

            // Enemies.Locations.Name
            if (locname != null)
            {
                response = response.Where(e => e.Locations.Any(l => l.Name.Contains(locname)));
                send = true;
            }

            // Enemies.Locations.HP
            // All varitons of HP can be achieved with these ranges (such as ==, !=, >, and <)
            if (!HpNull && (hplt != null || hpgt != null))
            {
                if (hplt != null)
                {
                    response = response.Where(e => e.Locations.Any(l => l.HP <= hplt));
                    send = true;
                }
                if (hpgt != null)
                {
                    response = response.Where(e => e.Locations.Any(l => l.HP >= hpgt));
                    send = true;
                }
            }
            else if (HpNull)
            {
                response = response.Where(e => e.Locations.Any(l => l.HP == null));
                send = true;
            }

            // Enemies.Locations.Souls
            // All varitons of Souls can be achieved with these ranges (such as ==, !=, >, and <)
            if (!SoulsNull && (soulslt != null || soulsgt != null))
            {
                if (soulslt != null)
                {
                    response = response.Where(e => e.Locations.Any(l => l.Souls <= soulslt));
                    send = true;
                }
                if (soulsgt != null)
                {
                    response = response.Where(e => e.Locations.Any(l => l.Souls >= soulsgt));
                    send = true;
                }
            }
            else if (SoulsNull)
            {
                response = response.Where(e => e.Locations.Any(l => l.Souls == null));
                send = true;
            }

            // Enemies.Drops.Name
            if (dropname != null)
            {
                response = response.Where(e => e.Drops.Any(d => d.Name.Contains(dropname)));
                send = true;
            }

            // Enemies.Drops.Location
            if (droploc != null)
            {
                response = response.Where(e => e.Drops.Any(d => d.Location.Contains(droploc)));
                send = true;
            }

            // Enemies.Drops.Rate
            // All varitons of Souls can be achieved with these ranges (such as ==, !=, >, and <)
            if (!RateNull && (ratelt != null || rategt != null))
            {
                if (ratelt != null)
                {
                    response = response.Where(e => e.Drops.Any(d => d.Rate <= ratelt));
                    send = true;
                }
                if (rategt != null)
                {
                    response = response.Where(e => e.Drops.Any(d => d.Rate >= rategt));
                    send = true;
                }
            }
            else if (RateNull)
            {
                response = response.Where(e => e.Drops.Any(d => d.Rate == null));
                send = true;
            }

            // Enemies.Damages.DamageType
            if (damagetype != null)
            {
                if (damagetype == "lightning" || damagetype == "poison" || damagetype == "frost" || damagetype == "bleed"
                    || damagetype == "physical" || damagetype == "fire" || damagetype == "magic" || damagetype == "thrust"
                    || damagetype == "slash" || damagetype == "strike")
                {
                    response = response.Where(e => e.Damages.Any(d => d.DamageType == damagetype));
                    send = true;
                }
                else
                {
                    Console.Write("WARNING: damagetype was ignored due to a bad value!\n");
                }
            }

            // Enemies.Damages.Category
            if (category != null)
            {
                if (category == 'i' || category == 'r' || category == 'w')
                {
                    response = response.Where(e => e.Damages.Any(d => d.Category == category));
                    send = true;
                }
                else
                {
                    Console.Write("WARNING: category was ignored due to a bad value!\n");
                }
            }


            if (send)
            {
                return Ok(response
                    .Select(e => new EnemyEntry()
                    {
                        Id = e.Id,
                        Name = e.Name
                    }));
            }
            else
            {
                return NotFound();
            }
        }
    }
}
