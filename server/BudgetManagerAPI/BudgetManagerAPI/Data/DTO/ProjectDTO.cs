namespace BudgetManagerAPI.Data.DTO {
	public class ProjectDTO {

		public string? ProjectName { get; set; }
		public float InitialBudget { get; set; }
		public float AmountSpent { get; set; }
		public bool IsSpecial { get; set; }
		public float HourTask { get; set; } // ore taskN + taskS
		public int NumberOfFinishTask { get; set; } // nr taskS F
	}
}
