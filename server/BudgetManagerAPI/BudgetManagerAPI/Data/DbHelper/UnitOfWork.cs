using BudgetManagerAPI.Data.Repositories;

namespace BudgetManagerAPI.Data.DbHelper
{
    public class UnitOfWork
    {
        private readonly BudgetManagerDbContext _dbContext;
        public EmployeeRepository Employee { get; set; }
        public TaskRepository Task { get; set; }
        public ProjectRepository Project{ get; set; }

        public UnitOfWork
        (
            BudgetManagerDbContext dbContext,
            EmployeeRepository employeeRepository,
            TaskRepository taskRepository,
            ProjectRepository projectRepository
      )
        {
            _dbContext = dbContext;
            Employee = employeeRepository;
            Task = taskRepository;
            Project = projectRepository;
        }
        public void SaveChanges()
        {
            try
            {
                _dbContext.SaveChanges();
            }
            catch (Exception exception)
            {
                var errorMessage = "Error when saving to the database: "
                    + $"{exception.Message}\n\n"
                    + $"{exception.InnerException}\n\n"
                    + $"{exception.StackTrace}\n\n";

                Console.WriteLine(errorMessage);
            }
        }
    }
}
