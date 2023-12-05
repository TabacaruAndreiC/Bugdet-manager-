using BudgetManagerAPI.Data.DbHelper;
using BudgetManagerAPI.Data.Entities;

namespace BudgetManagerAPI.Data.Repositories
{
    public class EmployeeRepository:BaseRepository<Employee>
    {
        public EmployeeRepository(BudgetManagerDbContext dbContext):base(dbContext) { }
    }
}
