namespace BudgetManagerAPI.Data.Entities
{
    public class Project: BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public float BugdetInitial { get; set; }
        public float Cheltuieli {  get; set; }

        public bool IsSpecial { get; set; }

    }
}
