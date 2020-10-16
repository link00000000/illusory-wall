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
        ///     Endpoint to insert new enemies into the database
        /// </summary>
        /// <param name="enemy">Enemy model object to insert into database</param>
        /// <returns>The HttpStatusCode for the state of the transaction</returns>
        [HttpPost]
        [Route("Add")]
        public HttpStatusCode AddEnemy(Enemy enemy)
        {
            // add enemy andd save changes
            _context.Enemies.Add(enemy);
            int count;
            
            try
            {
                count = _context.SaveChanges();
            }
            catch (System.Exception)
            {  
                return HttpStatusCode.InternalServerError;
            }
            
            // if changes occurred it worked, else something went wrong
            if(count > 0)
                return HttpStatusCode.OK;

            return HttpStatusCode.InternalServerError;
        }
    }
}
