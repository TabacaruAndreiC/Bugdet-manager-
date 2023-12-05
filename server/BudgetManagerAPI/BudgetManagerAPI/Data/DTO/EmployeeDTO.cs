namespace BudgetManagerAPI.Data.DTO {
	public class EmployeeDTO {
		public string firstName { get; set; }
		public string lastName { get; set; }
		public int hourlyRate { get; set; }
		public List<DayDTO> days { get; set; }
	}
}
