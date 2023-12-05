using BudgetManagerAPI.Data.DbHelper;
using BudgetManagerAPI.Data.Entities;

namespace BudgetManagerAPI.Data.Repositories
{
    public class ProjectRepository : BaseRepository<Project>
    {
        public ProjectRepository(BudgetManagerDbContext dbContext):base(dbContext) { }
    }
}
