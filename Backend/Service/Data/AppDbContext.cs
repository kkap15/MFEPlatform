using System;
using Microsoft.EntityFrameworkCore;
using Service.Models;

namespace Service.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<RegisteredApp> Apps => Set<RegisteredApp>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<RegisteredApp>(o =>
        {
            o.HasIndex(a => a.Name).IsUnique();
            o.HasIndex(a => a.RoutePrefix).IsUnique();
        });
    }
}