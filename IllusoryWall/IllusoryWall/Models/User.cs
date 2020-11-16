using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace IllusoryWall.Models
{
    public class User
    {

        public int Id { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        [JsonIgnore]
        public string Password { get; set; }

        [Required]
        public char Type { get; set; }

        [Required]
        public string Spice { get; set; }

    }
}
