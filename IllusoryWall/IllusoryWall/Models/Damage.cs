using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace IllusoryWall.Models
{
    /// <summary>
    ///     Model class for the Damages table
    /// </summary>
    public class Damage
    {
        /// <summary>
        ///     Id for the table entry
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        ///     EnemyId for a foreign key that is the id of the enemy the entry refers to.
        /// </summary>
        [JsonIgnore]
        public virtual Enemy Enemy { get; set; }

        /// <summary>
        ///     Column to explain what type of damage the entry is referring to.
        ///     (i.e Thrust, Slash, Blunt, Magic, Fire, Poison, etc)
        /// </summary>
        [Required]
        public string DamageType { get; set; }

        /// <summary>
        ///     Column to distinguish if the damage type is a weakness (W), Resistance (R), or Immunity (I)
        /// </summary>
        [Required]
        public char Category { get; set; }
    }
}
