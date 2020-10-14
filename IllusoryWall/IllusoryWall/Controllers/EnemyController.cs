using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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
    }
}
