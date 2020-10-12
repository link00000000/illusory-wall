using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace IllusoryWall.Models
{
    public class Enemy
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public bool Respawns { get; set; }

        public string Class { get; set; }

        [Required]
        public string ImagePath { get; set; }

        public virtual ICollection<Location> Locations { get; set; }

        public virtual ICollection<Drop> Drops { get; set; }

        public virtual ICollection<Damage> Damages { get; set; }
    }
}
