using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IllusoryWall.Models
{
    /// <summary>
    ///     Model class for the Enemies table
    /// </summary>
    public class Enemy
    {
        /// <summary>
        ///     Unique field for the entry id of the enemy
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        ///     Field for the name of the Enemy entry.
        /// </summary>
        [Required]
        public string Name { get; set; }

        /// <summary>
        ///     Field for the Description of the Enemy entry.
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        ///     Boolean field whether the enemy respawns or not
        /// </summary>
        public bool Respawns { get; set; }

        /// <summary>
        ///     Field for the class of the enemy entry. (Boss, General, NPC, Invader, etc)
        /// </summary>
        public string Class { get; set; }

        /// <summary>
        ///     Field to store the path to the image for the enemy
        /// </summary>
        public string ImagePath { get; set; }

        /// <summary>
        ///     Connection to the Locations table
        /// </summary>
        [InverseProperty("Enemy")]
        public virtual ICollection<Location> Locations { get; set; }

        /// <summary>
        ///     Connection to the Drops table
        /// </summary>
        [InverseProperty("Enemy")]
        public virtual ICollection<Drop> Drops { get; set; }

        /// <summary>
        ///     Connection to the Damages table
        /// </summary>
        [InverseProperty("Enemy")]
        public virtual ICollection<Damage> Damages { get; set; }
    }
}
