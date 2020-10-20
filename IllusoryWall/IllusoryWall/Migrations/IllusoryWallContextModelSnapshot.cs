﻿// <auto-generated />
using System;
using IllusoryWall.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace IllusoryWall.Migrations
{
    [DbContext(typeof(IllusoryWallContext))]
    partial class IllusoryWallContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("IllusoryWall.Models.Damage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("varchar(1) CHARACTER SET utf8mb4");

                    b.Property<string>("DamageType")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int?>("EnemyId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("EnemyId");

                    b.ToTable("Damages");
                });

            modelBuilder.Entity("IllusoryWall.Models.Drop", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("EnemyId")
                        .HasColumnType("int");

                    b.Property<string>("Location")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<double>("Rate")
                        .HasColumnType("double");

                    b.HasKey("Id");

                    b.HasIndex("EnemyId");

                    b.ToTable("Drops");
                });

            modelBuilder.Entity("IllusoryWall.Models.Enemy", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Class")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Description")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("ImagePath")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.Property<bool>("Respawns")
                        .HasColumnType("tinyint(1)");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Enemies");
                });

            modelBuilder.Entity("IllusoryWall.Models.Location", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("EnemyId")
                        .HasColumnType("int");

                    b.Property<int>("HP")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("Souls")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("EnemyId");

                    b.ToTable("Locations");
                });

            modelBuilder.Entity("IllusoryWall.Models.Damage", b =>
                {
                    b.HasOne("IllusoryWall.Models.Enemy", "Enemy")
                        .WithMany("Damages")
                        .HasForeignKey("EnemyId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IllusoryWall.Models.Drop", b =>
                {
                    b.HasOne("IllusoryWall.Models.Enemy", "Enemy")
                        .WithMany("Drops")
                        .HasForeignKey("EnemyId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IllusoryWall.Models.Location", b =>
                {
                    b.HasOne("IllusoryWall.Models.Enemy", "Enemy")
                        .WithMany("Locations")
                        .HasForeignKey("EnemyId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
