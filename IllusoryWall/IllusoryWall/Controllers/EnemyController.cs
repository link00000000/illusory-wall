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
            if(enemy == null)
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
            // add enemy andd save changes
            _context.Enemies.Add(enemy);

            if(enemy == null)
                return StatusCode(400);

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
            if(count > 0)
                return Ok();

            return StatusCode(500);
        }

        /// <summary>
        ///     Endpoint to remove an enemy by using the id
        /// </summary>
        /// <param name="id">id of the enemy to remove</param>
        /// <returns>Status code for the state of the transaction</returns>
        [HttpGet]
        [Route("Remove/{id}")]
        public IActionResult AddEnemy(int id)
        {
            // add enemy andd save changes
            Enemy enemy = _context.Enemies.Find(id);

            if(enemy == null)
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
            if(count > 0)
                return Ok();

            return StatusCode(500);
        }
    }
}
