using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BudgetManagerAPI.Data.DbHelper;
using BudgetManagerAPI.Data.Entities;

namespace BudgetManagerAPI.Controllers {
	[Route("api/[controller]")]
	public class ProjectController : ControllerBase {
		
		private readonly BudgetManagerDbContext _context;

		#region Constructor

		public ProjectController(BudgetManagerDbContext context) {
			_context = context;
		}


		#endregion

		#region HttpGet
		[HttpGet]
		public async Task<ActionResult<IEnumerable<Project>>> GetProjects() {
			return await _context.Project.ToListAsync();
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<Project>> GetProject(Guid id) {
			var project = await _context.Project.FindAsync(id);

			if (project == null) {
				return NotFound();
			}

			return project;
		}
		#endregion

		#region HttpPost

		// POST: api/Project
		[HttpPost]
		public async Task<ActionResult<Project>> PostProject(Project project) {
			_context.Project.Add(project);
			await _context.SaveChangesAsync();

			return CreatedAtAction("GetProject", new { id = project.Id }, project);
		}


		#endregion

		#region HttpPut
		[HttpPut("{id}")]

		public async Task<IActionResult> PutProject(Guid id, Project project) {
			if (id != project.Id) {
				return BadRequest();
			}

			_context.Entry(project).State = EntityState.Modified;

			try {
				await _context.SaveChangesAsync();
			} catch (DbUpdateConcurrencyException) {
				if (!ProjectExists(id)) {
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
		public async Task<IActionResult> DeleteProject(Guid id) {
			var project = await _context.Project.FindAsync(id);
			if (project == null) {
				return NotFound();
			}

			_context.Project.Remove(project);
			await _context.SaveChangesAsync();

			return NoContent();
		}



		#endregion

		#region Misc

		private bool ProjectExists(Guid id) {
			return _context.Project.Any(e => e.Id == id);
		}

		#endregion


	}
}
