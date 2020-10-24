using System;
using System.Collections.Generic;
using System.Linq;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using IllusoryWall.Data;
using IllusoryWall.Models;

namespace IllusoryWall.Controllers
{
    [ApiController]
    [Route("[controller]")]

    /// <summary>
    ///     Controller class to handle requests to Enemy
    /// </summary>
    public class EnemyController : ControllerBase
    {
        /// <summary>
        ///     IllusoryWallContext object for reuse throughout API
        /// </summary>
        private readonly IllusoryWallContext _context;

        /// <summary>
        ///     Constructor
        /// </summary>
        public EnemyController()
        {
            _context = new IllusoryWallContext();
        }

        /// <summary>
        ///     Endpoint to  retrieve enemies from the database  given its id
        /// </summary>
        /// <param name="id">id of the enemy to search for</param>
        /// <returns>The results of the query with response code</returns>
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

        /// <summary>
        ///     Endpoint to insert new enemies into the database
        /// </summary>
        /// <param name="enemy">Enemy model object to insert into database</param>
        /// <returns>The status code for the state of the transaction</returns>
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

        /// <summary>
        ///     Endpoint to remove an enemy by using the id
        /// </summary>
        /// <param name="id">id of the enemy to remove</param>
        /// <returns>Status code for the state of the transaction</returns>
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

        /// <summary>
        ///     Endpoint to modify an enemy (more like delete old entry and reinsert new entry). The Drops, Damages, and Locations ids
        ///     must be set by the client's logic if the ids to stay the same
        /// </summary>
        /// <param name="newEnemy">Enemy filled with the updates</param>
        /// <param name="id">id of enemy to update</param>
        /// <returns>Status of resulting request</returns>
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
    }
}
