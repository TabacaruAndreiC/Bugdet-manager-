using System.Diagnostics;

namespace BudgetManagerAPI.Data.DTO {
	public class DayDTO {
		public string Day { get; set; }
		public List<TasklistDTO> tasklist { get; set; }
	}
}
