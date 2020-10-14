using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace IllusoryWall.Models
{
    /// <summary>
    ///     Model class for the Locations table
    /// </summary>
    public class Location
    {
        /// <summary>
        ///     Unique field to represent the entry in the table
        /// </summary>
        public int Id { get; set; }

        [Required]
        /// <summary>
        ///     Field to the id of the enemy in this location
        ///     Is a foreign key to the Enemies table
        /// </summary>
        public int EnemyId { get; set; }

        /// <summary>
        ///     Field for the hp of the enemy in the location
        /// </summary>
        public int HP { get; set; }

        /// <summary>
        ///     Field for the souls dropped for the enemy in this location
        /// </summary>
        public int Souls { get; set; }

        [Required]
        /// <summary>
        ///     Field for the name of the location
        /// </summary>
        public string Name { get; set; }
    }
}
