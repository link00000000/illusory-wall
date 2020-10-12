using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using IllusoryWall.Models;

namespace IllusoryWall.Data
{
    public class IllusoryWallContext : DbContext
    {
        public DbSet<Enemy> Enemies { get; set; }

        public DbSet<Location> Locations { get; set; }

        public DbSet<Damage> Damages { get; set; }

        public DbSet<Drop> Drops { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies()
            .UseMySql("server=127.0.0.1;port=3306;user=user;password=user;database=illusory_wall", 
                        builder => builder.EnableRetryOnFailure());

        }
    }
}