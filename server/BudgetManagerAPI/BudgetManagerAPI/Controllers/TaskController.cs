using BudgetManagerAPI.Data.DbHelper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Task = BudgetManagerAPI.Data.Entities.Task;

namespace BudgetManagerAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly BudgetManagerDbContext _context;

        #region Constructor
        public TaskController(BudgetManagerDbContext context)
        {
            _context = context;
        }
        #endregion
        #region HttpGet
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Task>>> GetTasks()
        {
            var tasks = await _context.Task.ToListAsync();
            return Ok(tasks);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Task>> GetTask(Guid id)
        {
            var task = await _context.Task.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }
        #endregion
        #region HttpPost
        [HttpPost]
        public async Task<ActionResult<Task>> PostTask([FromBody] Task task)
        {
            _context.Task.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }
        #endregion
        #region HttpPut
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTask(Guid id, [FromBody] Task task)
        {
            if (id != task.Id)
            {
                return BadRequest();
            }

            _context.Entry(task).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(id))
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
        public async Task<IActionResult> DeleteTask(Guid id)
        {
            var task = await _context.Task.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            _context.Task.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        #endregion
        #region Misc
        private bool TaskExists(Guid id)
        {
            return _context.Task.Any(x => x.Id == id);
        }
        #endregion
    }
}
