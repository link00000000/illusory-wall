using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace IllusoryWall.Models
{
    public class Drop
    {
        /// <summary>
        ///     unique Id for the entry of the table
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        ///     Field for the id of the enemy the drop is matched with. 
        ///     It is a foreign key field
        /// </summary>
        [JsonIgnore]
        public virtual Enemy Enemy { get; set; }

        /// <summary>
        ///     Field for the name of the drop
        /// </summary>
        [Required]
        public string Name { get; set; }

        /// <summary>
        ///     Field for the percentage chance of the drop.
        ///     It is NULL if unknown and a 100% if guaranteed.
        /// </summary>
        public double? Rate { get; set; }

        /// <summary>
        ///     Field for the Location it is dropped at.
        ///     Not all locations have the same drop and if this field is NULL it should be assumed dropped everywhere the enemy
        ///     is located.
        /// </summary>
        public string Location { get; set; }
    }

    class PartialDrop : Drop
    {
        [JsonIgnore]
        public new int Id { get; set; }
    }
}
