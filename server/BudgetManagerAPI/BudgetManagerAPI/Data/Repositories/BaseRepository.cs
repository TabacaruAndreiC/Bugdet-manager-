using BudgetManagerAPI.Data.DbHelper;
using BudgetManagerAPI.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;

namespace BudgetManagerAPI.Data.Repositories
{
    public class BaseRepository<T>where T: BaseEntity
    {
        protected readonly BudgetManagerDbContext _dbContext;
        private readonly DbSet<T> _dbSet;

        public BaseRepository(BudgetManagerDbContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = dbContext.Set<T>();
        }
        public T GetById(Guid id)
        {
            return _dbSet.FirstOrDefault(entity => entity.Id == id);
        }
        public void Insert(T entity)
        {
            _dbSet.Add(entity);
        }
        public void Update(T entity)
        {
            _dbSet.Update(entity);
        }
        public void Remove(T entity)
        {
            _dbSet.Remove(entity);
        }
    }
}
