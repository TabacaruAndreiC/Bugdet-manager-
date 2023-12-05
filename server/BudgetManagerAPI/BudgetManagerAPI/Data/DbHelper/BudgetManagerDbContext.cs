using BudgetManagerAPI.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace BudgetManagerAPI.Data.DbHelper
{
    public class BudgetManagerDbContext : DbContext
    {
        public BudgetManagerDbContext(DbContextOptions<BudgetManagerDbContext> options) : base(options) { }
        public DbSet<Employee> Employee { get; set; }
        public DbSet<Project> Project { get; set; }
        public DbSet<Entities.Task> Task { get; set; }
        public DbSet<WorkSesion> WorkSesions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
