using System.Diagnostics.Eventing.Reader;

namespace BudgetManagerAPI.Data.Entities
{
    public class Task: BaseEntity
    {
		private string taskName;
		private int v1;
		private float hoursWorked;
		private string project;
		private bool v2;
		private object value;

		public string Name { get; set; } = string.Empty;
        public float Value { get; set; }
        public float TotalHours { get; set; }
        public Guid ProjectId { get; set; } = Guid.Empty;
        public bool IsRunning { get; set; }
        public bool IsSpecial { get; set; }

      
	}
}
