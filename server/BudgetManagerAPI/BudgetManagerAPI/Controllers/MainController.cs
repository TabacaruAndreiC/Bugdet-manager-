using BudgetManagerAPI.Data.DbHelper;
using BudgetManagerAPI.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using BudgetManagerAPI.Data.DTO;
using Newtonsoft.Json;
using Task = BudgetManagerAPI.Data.Entities.Task;

namespace BudgetManagerAPI.Controllers {
	[Route("api/[controller]")]
	public class MainController : ControllerBase
	{
		private readonly BudgetManagerDbContext _context;

		#region Constructor

		public MainController(BudgetManagerDbContext context)
		{
			_context = context;
		}

		#endregion

		[HttpGet]
		public IActionResult Get()
		{
			return Ok();
		}

		[HttpGet("Project")]
		public List<ProjectDTO> GetProject()
		{
			List<ProjectDTO> projectList = new List<ProjectDTO>();
			List<Project> projects = _context.Project.ToList();
			List<Task> tasks = _context.Task.ToList();

			foreach (var project in projects)
			{
				if (project.IsSpecial == true)
				{
					var vector = tasks.Where(t => t.ProjectId == project.Id).ToList();

					float time = 0;
					int count = 0;
					float value = 0;
					foreach (var task in vector) {
						time += task.TotalHours;

						if (task.IsRunning == false) {
							count++;
							value += task.Value;
						}
					}

					projectList.Add(new ProjectDTO() { AmountSpent = value, HourTask = time, InitialBudget = project.BugdetInitial, IsSpecial = project.IsSpecial, ProjectName = project.Name, NumberOfFinishTask = count });


				} else
				{
					var vector = tasks.Where(t => t.ProjectId == project.Id).ToList();

					float time = 0;
					int count = 0;

					foreach (var task in vector) {
						time += task.TotalHours;

						if (task.IsRunning == false) {
							count++;
							project.Cheltuieli += task.Value;
						}
					}

					projectList.Add(new ProjectDTO() { AmountSpent = project.Cheltuieli, HourTask = time, InitialBudget = project.BugdetInitial, IsSpecial = project.IsSpecial, ProjectName = project.Name, NumberOfFinishTask = count });

				}

			}



			return projectList;
		}

		[HttpGet("WorkSession")]
		public List<WorkSesionDTO> GetWorkSession()
		{
			List<WorkSesionDTO> work = new List<WorkSesionDTO>();
			List<WorkSesion> workSession = _context.WorkSesions.ToList();

			foreach (var session in workSession)
			{
				work.Add(new WorkSesionDTO() 
				{FirstName = _context.Employee.FirstOrDefault(e=>e.Id == session.EmployeeId).Name,
					LastName = _context.Employee.FirstOrDefault(e => e.Id == session.EmployeeId).Surname,
					ProjectName = _context.Project.FirstOrDefault(p=> p.Id == session.ProjectId).Name,
					TaskName = _context.Task.FirstOrDefault(t=>t.Id == session.TaskId).Name,
					HourRate = _context.Employee.FirstOrDefault(e => e.Id == session.EmployeeId).HourRater,
					HourWork = _context.Employee.FirstOrDefault(e => e.Id == session.EmployeeId).HourOfWork,
					WorkedHours = session.Duration,
					Data = session.WorkDate
				});
			}

			return work;
		}

		[HttpGet("Employee")]

		public List<EmployeeInfo> getEmployee()
		{
			List<EmployeeInfo> employees = new List<EmployeeInfo>();
			List<Employee> employeeList = _context.Employee.ToList();
			List<WorkSesion> workSesions = _context.WorkSesions.ToList();
			List<Task> tasks = _context.Task.ToList();


			foreach (var employee in employeeList)
			{
				float value = 0;
				foreach (var session in workSesions)
				{
					if (session.EmployeeId == employee.Id)
					{
						Task task = _context.Task.FirstOrDefault(t => t.Id == session.TaskId);

						if (task.IsRunning == false)
						{
							value += task.Value;
						}
						else if (task.IsSpecial == false)
						{
							value += session.Duration * employee.HourRater;
						}
					}
				}

				employees.Add(new EmployeeInfo(){FirstName = employee.Name, LastName = employee.Surname, HourRate = employee.HourRater, HourWork = employee.HourOfWork, MoneyEarned = value});

			}

			return employees;
		}



		[HttpPost]
		public async Task<IActionResult> TestMethod(IFormFile file)
		{
			DeleteData();
			

			using (var reader = new StreamReader(file.OpenReadStream())) {
				var fileContent = reader.ReadToEnd();

				try
				{

					List<EmployeeDTO> employees = JsonConvert.DeserializeObject<List<EmployeeDTO>>(fileContent);

					foreach (var employee in employees)
					{
						_context.Employee.Add(new Employee()
						{
							HourOfWork = 0, HourRater = employee.hourlyRate, Name = employee.firstName,
							Surname = employee.lastName
						});
						_context.SaveChanges();

						foreach (var day in employee.days)
						{

							foreach (var tasklist in day.tasklist)
							{

								if (_context.Task.FirstOrDefault(t => t.Name == tasklist.NumeTask) != null)
								{
									Task task = _context.Task.FirstOrDefault(t => t.Name == tasklist.NumeTask);
									task.TotalHours += tasklist.OreLucrate;
									task.IsRunning = !tasklist.IsFinished;


									if (task.IsSpecial != true)
									{
										Employee employeeDTO = _context.Employee.FirstOrDefault(e =>
											e.Name == employee.firstName && e.Surname == employee.lastName);

										employeeDTO.HourOfWork += tasklist.OreLucrate;

									}


									_context.SaveChanges();


								} 
								else
								{


									_context.Task.Add(new Task()
									{
										IsSpecial = tasklist.Special,
										IsRunning = !tasklist.IsFinished,
										Name = tasklist.NumeTask,
										ProjectId = _context.Project.FirstOrDefault(p => p.Name == tasklist.NumeProiect)
											.Id,
										TotalHours = tasklist.OreLucrate,
										Value = tasklist.Value,
									});
									_context.SaveChanges();

									Task task = _context.Task.FirstOrDefault(t => t.Name == tasklist.NumeTask);


									if (task.IsSpecial != true)
									{

										Employee employeeDTO = _context.Employee.FirstOrDefault(e =>
											e.Name == employee.firstName && e.Surname == employee.lastName);

										employeeDTO.HourOfWork += tasklist.OreLucrate;

									}
									_context.SaveChanges();
								}

								_context.WorkSesions.Add(new WorkSesion() {
									Duration = tasklist.OreLucrate,
									WorkDate = day.Day,
									EmployeeId = _context.Employee.FirstOrDefault(e => e.Name == employee.firstName && e.Surname == employee.lastName).Id,
									ProjectId = _context.Project.FirstOrDefault(p => p.Name == tasklist.NumeProiect).Id,
									TaskId = _context.Task.FirstOrDefault(t => t.Name == tasklist.NumeTask).Id,
								});
								_context.SaveChanges();

								Project project = _context.Project.FirstOrDefault(p => p.Name == tasklist.NumeProiect);

								project.Cheltuieli += tasklist.OreLucrate * employee.hourlyRate;

								_context.SaveChanges();
							}

						}

					}


					
					_context.SaveChanges();


					return Ok();

				} catch (JsonReaderException) {

					return NotFound();

				}
			}

			 
		}

		private void DeleteData()
		{

			if (_context.Project.ToList().Count != 0)
			{
				foreach (var project in _context.Project.ToList())
				{
					project.Cheltuieli = 0;
				}
			}

			if (_context.WorkSesions.ToList().Count != 0)
			{
				var context1 = _context.WorkSesions.ToList();
				_context.WorkSesions.RemoveRange(context1);

			}

			if (_context.Task.ToList().Count != 0) {
				var context2 = _context.Task.ToList();
				_context.Task.RemoveRange(context2);

			}

			if (_context.Employee.ToList().Count != 0) {
				var context3 = _context.Employee.ToList();
				_context.Employee.RemoveRange(context3);

			}
	
		}
		

	}
}