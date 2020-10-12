using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace IllusoryWall.Models
{
    public class Damage
    {
        public int Id { get; set; }

        [Required]
        public int EnemyId { get; set; }

        [Required]
        public string DamageType { get; set; }

        [Required]
        public char Category { get; set; }

    }
}
