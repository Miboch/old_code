using Barebones.EFCore.Models;
using Microsoft.EntityFrameworkCore;

namespace Barebones.EFCore.database
{
    public class MyDatabaseContext : DbContext
    {
        public DbSet<SomeModel> SomeModels { get; set; }
        public MyDatabaseContext(DbContextOptions<MyDatabaseContext> options) : base(options) { }

    }
}
