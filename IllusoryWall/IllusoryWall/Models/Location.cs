using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace IllusoryWall.Models
{
    public class Location
    {
        public int Id { get; set; }

        [Required]
        public int EnemyId { get; set; }

        public int HP { get; set; }

        public int Souls { get; set; }

        [Required]
        public string Name { get; set; }

    }
}
