namespace BudgetManagerAPI.Data.DTO {
	public class TasklistDTO {
		public string NumeProiect { get; set; }
		public string NumeTask { get; set; }
		public float OreLucrate { get; set; }
		public float Value { get; set; }
		public bool Special {get; set; }
		public bool IsFinished {get; set; }
	}
}
