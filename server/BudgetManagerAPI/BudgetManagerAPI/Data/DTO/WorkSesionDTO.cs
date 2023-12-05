namespace BudgetManagerAPI.Data.DTO
{
    public class WorkSesionDTO
    {

        public string LastName { get; set; }
        public string FirstName { get; set; }

        public float HourRate { get; set; }
        public float HourWork { get; set; }

        public string Data { get; set; }

		public string TaskName {  set; get; } = string.Empty;
        public string ProjectName {  get; set; } = string.Empty; 
        public float WorkedHours { get; set; }
    }
}
