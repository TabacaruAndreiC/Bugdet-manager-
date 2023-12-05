using BudgetManagerAPI.Data.DbHelper;

namespace BudgetManagerAPI.Data.Repositories
{
    public class TaskRepository : BaseRepository<Entities.Task>
    {
        public TaskRepository(BudgetManagerDbContext dbContext) : base(dbContext) { }
    }
}
