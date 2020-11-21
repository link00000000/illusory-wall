using System;
using System.Collections.Generic;
using System.Text;
using IllusoryWall.Models;
using Microsoft.EntityFrameworkCore;

namespace IllusoryWall.Data {
    /// <summary>
    ///     Class for the context of the database
    /// </summary>
    public class IllusoryWallContext : DbContext {
        public IllusoryWallContext(DbContextOptions<IllusoryWallContext> options) : base(options) { }

        /// <summary>
        ///     Create Enemies table using Enemy Model class
        /// </summary>
        public DbSet<Enemy> Enemies { get; set; }

        /// <summary>
        ///     Create Locations table using Location Model class
        /// </summary>
        public DbSet<Location> Locations { get; set; }

        /// <summary>
        ///     Create Damages table using Damage Model class
        /// </summary>
        public DbSet<Damage> Damages { get; set; }

        /// <summary>
        ///     Create Drops table using Drop Model class
        /// </summary>
        public DbSet<Drop> Drops { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<HitList> HitLists { get; set; }

        /// <summary>
        ///     Calls when creating the models to fine tune some of the options
        /// </summary>
        /// <param name="builder">Object to set options for specific models</param>
        protected override void OnModelCreating(ModelBuilder builder) {
            // Make the Name attribute in the Enemy model unique
            builder.Entity<Enemy>()
                .HasIndex(p => p.Name)
                .IsUnique();

            builder.Entity<User>()
                .HasIndex(p => p.Username)
                .IsUnique();

            // Make foreign keys optional but cascade on delete
            builder.Entity<Location>()
                .HasOne(i => i.Enemy)
                .WithMany(d => d.Locations)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Drop>()
                .HasOne(i => i.Enemy)
                .WithMany(d => d.Drops)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Damage>()
                .HasOne(i => i.Enemy)
                .WithMany(d => d.Damages)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
