using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace IllusoryWall.Models
{
    public class Location
    {
        /// <summary>
        ///     Unique field to represent the entry in the table
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        ///     Field to the id of the enemy in this location
        ///     Is a foreign key to the Enemies table
        /// </summary>
        [JsonIgnore]
        public virtual Enemy Enemy { get; set; }

        /// <summary>
        ///     Field for the hp of the enemy in the location
        /// </summary>
        public int? HP { get; set; }

        /// <summary>
        ///     Field for the souls dropped for the enemy in this location
        /// </summary>
        public int? Souls { get; set; }

        /// <summary>
        ///     Field for the name of the location
        /// </summary>
        [Required]
        public string Name { get; set; }
    }
}
