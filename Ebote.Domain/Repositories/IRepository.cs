namespace Ebote.Domain.Repositories;

public interface IRepository<T> where T : class
{
    Task<T> GetByIdAsync(Guid id);

    Task AddAsync(T entity);

    Task DeleteAsync(Guid id);
}