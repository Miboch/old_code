﻿// <auto-generated />
using Barebones.EFCore.database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Barebones.EFCore.Migrations
{
    [DbContext(typeof(MyDatabaseContext))]
    [Migration("20191214141400_initial")]
    partial class initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.0");

            modelBuilder.Entity("Barebones.EFCore.Models.SomeModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("FieldFour")
                        .HasColumnType("TEXT");

                    b.Property<string>("FieldOne")
                        .HasColumnType("TEXT");

                    b.Property<string>("FieldThree")
                        .HasColumnType("TEXT");

                    b.Property<string>("FieldTwo")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("SomeModels");
                });
#pragma warning restore 612, 618
        }
    }
}
