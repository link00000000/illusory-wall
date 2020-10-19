using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using IllusoryWall.Models;

namespace IllusoryWall.Data
{
    /// <summary>
    ///     Class for the context of the database
    /// </summary>
    public class IllusoryWallContext : DbContext
    {
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

        /// <summary>
        ///     Called when configuring to set some options which specify the ability to lazy load, user a MySql database, and
        ///     allow a certain amount of retries to connect to the database
        /// </summary>
        /// <param name="optionsBuilder">Object used to set options for the database context to be built with</param>
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies()
            .UseMySql("server=127.0.0.1;port=3306;user=user;password=user;database=illusory_wall", 
                        builder => builder.EnableRetryOnFailure());

        }

        /// <summary>
        ///     Calls when creating the models to fine tune some of the options
        /// </summary>
        /// <param name="builder">Object to set options for specific models</param>
        protected override void OnModelCreating(ModelBuilder builder)
        {
            // Make the Name attribute in the Enemy model unique
            builder.Entity<Enemy>()
                .HasIndex(p => p.Name)
                .IsUnique();
        }
    }
}
