using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace IllusoryWall.Models
{
    public class Drop
    {
        public int Id { get; set; }

        [Required]
        public int EnemyId { get; set; }

        [Required]
        public string Name { get; set; }

        public double Rate { get; set; }

        public string Location { get; set; }

    }
}
