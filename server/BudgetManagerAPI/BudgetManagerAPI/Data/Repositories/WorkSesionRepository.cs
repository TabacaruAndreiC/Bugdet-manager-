using BudgetManagerAPI.Data.DbHelper;
using BudgetManagerAPI.Data.Entities;

namespace BudgetManagerAPI.Data.Repositories
{
    public class WorkSesionRepository: BaseRepository<WorkSesion>
    {
        public WorkSesionRepository(BudgetManagerDbContext dbContext) : base(dbContext) { }

        
    }
}
