namespace BudgetManagerAPI.Data.Entities
{
    public class WorkSesion: BaseEntity
    {
        public Guid EmployeeId { get; set; } = Guid.Empty;
        public string WorkDate { get; set; }
        public Guid ProjectId { get; set; } = Guid.Empty;
        public Guid TaskId { get; set; } = Guid.Empty;
        public float Duration { get; set; } 
    }
}
