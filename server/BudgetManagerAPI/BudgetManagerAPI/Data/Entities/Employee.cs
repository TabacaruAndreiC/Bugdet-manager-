namespace BudgetManagerAPI.Data.Entities
{
    public class Employee: BaseEntity
    {
        public string Name {  get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public float HourRater { get; set; } 
        public float HourOfWork { get; set; }
    }
}
