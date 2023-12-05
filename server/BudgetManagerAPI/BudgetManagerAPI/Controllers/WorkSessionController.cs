using BudgetManagerAPI.Data.DbHelper;
using BudgetManagerAPI.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BudgetManagerAPI.Controllers {
	[Route("api/[controller]")]
	public class WorkSessionController : ControllerBase {

		private readonly BudgetManagerDbContext _context;

		public WorkSessionController(BudgetManagerDbContext context) {
			this._context = context;
		}

		#region HttpGet

		[HttpGet]
		public async Task<ActionResult<IEnumerable<WorkSesion>>> GetWorkSession() {
			return await _context.WorkSesions.ToListAsync();
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<WorkSesion>> GetWorkSession(Guid id) {
			var workSession = await _context.WorkSesions.FindAsync(id);

			if (workSession == null) {
				return NotFound();
			}

			return workSession;
		}

		#endregion

		#region HttpPost

		[HttpPost]
		public async Task<ActionResult<WorkSesion>> PostWorkSession(WorkSesion workSession) {
			_context.WorkSesions.Add(workSession);
			await _context.SaveChangesAsync();

			return CreatedAtAction("GetWorkSession", new { id = workSession.Id }, workSession);
		}


		#endregion

		#region HttpPut
		[HttpPut("{id}")]

		public async Task<IActionResult> PutWorkSession(Guid id, WorkSesion workSession) {
			if (id != workSession.Id) {
				return BadRequest();
			}

			_context.Entry(workSession).State = EntityState.Modified;

			try {
				await _context.SaveChangesAsync();
			} catch (DbUpdateConcurrencyException) {
				if (!WorkSessionExist(id)) {
					return NotFound();
				} else {
					throw;
				}
			}

			return NoContent();
		}

		#endregion

		#region HttpDelete
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteWorkSession(Guid id) {
			var workSession = await _context.WorkSesions.FindAsync(id);
			if (workSession == null) {
				return NotFound();
			}

			_context.WorkSesions.Remove(workSession);
			await _context.SaveChangesAsync();

			return NoContent();
		}



		#endregion


		#region Misc
		private bool WorkSessionExist(Guid id) {
			return _context.WorkSesions.Any(x => x.Id == id);
		}
		#endregion




	}
}
