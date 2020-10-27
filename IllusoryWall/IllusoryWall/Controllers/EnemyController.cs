using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.DynamicLinq;
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
        [Route("Search")]
        public IActionResult SearchEnemy
        (
            [FromQuery] List<string> att = null, 
            [FromQuery] string keyword = null, 
            [FromQuery] Nullable<bool> respawns = null, 
            [FromQuery] string type = null
        )
        {
            /*
                att:
                    is the attribute for the condition to be placed (Name, Class, Respawns)
                        - They should be all lowercase but will be converted to all lower case either way
                        - if any of the att is not on of the expect it will return a bad request status

                keyword:
                    is for the attibute Name where the keyword will be pattern matched to case insensitive and substring search
                        - There is only one at a time as this only allows one name search in a query
                        - leaving the value null when there is a name att will return a bad request satus

                respawns:
                    is a nullable bool used to search for Enemies Respawns
                        - it can be left null when there is an respawns att and this will just search for values of null
                        - there is only one since there should be only one of these per query

                type:
                    is for the attribute Class to search for a specific type of Enemies
                        - can be left blank to search for nulls
                        - should only be one per query

                USE EXAMPLES:
                    returns Enemies with "oll" in there name and Respawns are NULL
                        /Search?att=name&keyword=oll&att=respawns 
                
            */
            
            //Locations: Names, HP, Souls
            //Drops:     Name, Rate, Location
            //Damages:   DamageType, Category

            string WhereClause = "";

            int Size = att.Count();

            for(int i = 0; i < Size; ++i)
            {
                switch (att[i].ToLower())
                {
                    
                    case "name":
                        if(keyword == null)
                        {
                            Console.Write("ERROR: keyword can't be null in a name search! \n");
                            return BadRequest();
                        }

                        if(i < Size - 1 && Size != 1)
                            WhereClause += "Name.Contains(\"" + keyword + "\") AND ";
                        else
                            WhereClause += "Name.Contains(\"" + keyword + "\")";
                        break;
                    case "respawns":

                        if(i < Size - 1 && Size != 1)
                        {
                            if(respawns == null)
                                WhereClause += "Respawns == null AND ";
                            else
                                WhereClause += "Respawns == " + respawns + " AND ";
                        }
                        else
                        {
                            if(respawns == null)
                                WhereClause += "Respawns == null";
                            else
                                WhereClause += "Respawns == " + respawns;
                        }
                        break;
                    case "class":
                        if(type == "npc" || type == "generic" || type == "boss" || type == "invader" || type == null)
                        {
                            if(i < Size - 1 && Size != 1)
                            {
                                if(type == null)
                                    WhereClause += "Class == null AND ";
                                else
                                    WhereClause += "Class == \"" + type + "\" AND "; 
                            }
                            else
                            {
                                if(type == null)
                                    WhereClause += "Class == null";
                                else
                                    WhereClause += "Class == \"" + type + "\""; 
                            }
                        }
                        else
                        {
                            return BadRequest();
                        }
                        break;
                    default:
                        return BadRequest();
                }
            }

            //return Ok();
            Console.Write(WhereClause);
            return Ok(_context.Enemies.Where(WhereClause)
                        .Select(e => new EnemyEntry()
                        {
                            Id = e.Id,
                            Name = e.Name
                        }));
        }
    }
}
