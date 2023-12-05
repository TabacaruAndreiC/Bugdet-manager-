using BudgetManagerAPI.Data.DbHelper;
using BudgetManagerAPI.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BudgetManagerAPI.Controllers
{
 
        [Route("api/[controller]")]
        public class EmployeeController : ControllerBase
        {

            private readonly BudgetManagerDbContext _context;

            #region Constructor

            public EmployeeController(BudgetManagerDbContext context)
            {
                _context = context;
            }


            #endregion

            #region HttpGet
            [HttpGet]
            public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
            {
                return await _context.Employee.ToListAsync();
            }

            [HttpGet("{id}")]
            public async Task<ActionResult<Employee>> GetEmployee(Guid id)
            {
                var employee = await _context.Employee.FindAsync(id);

                if (employee == null)
                {
                    return NotFound();
                }

                return employee;
            }
            #endregion

            #region HttpPost

            // POST: api/Employee
            [HttpPost]
            public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
            {
                _context.Employee.Add(employee);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetEmployee", new { id = employee.Id }, employee);
            }


            #endregion

            #region HttpPut
            [HttpPut("{id}")]

            public async Task<IActionResult> PutEmployee(Guid id, Employee employee)
            {
                if (id != employee.Id)
                {
                    return BadRequest();
                }

                _context.Entry(employee).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!EmployeeExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                return NoContent();
            }

            #endregion

            #region HttpDelete
            [HttpDelete("{id}")]
            public async Task<IActionResult> DeleteEmployee(Guid id)
            {
                var employee = await _context.Employee.FindAsync(id);
                if (employee == null)
                {
                    return NotFound();
                }

                _context.Employee.Remove(employee);
                await _context.SaveChangesAsync();

                return NoContent();
            }



            #endregion

            #region Misc

            private bool EmployeeExists(Guid id)
            {
                return _context.Employee.Any(e => e.Id == id);
            }

            #endregion


        }
    }

