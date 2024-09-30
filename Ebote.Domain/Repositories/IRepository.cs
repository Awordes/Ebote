namespace Ebote.Domain.Repositories;

public interface IRepository<T> where T : class
{
    Task<(T? Entity, bool IsSuccess, string ErrorMessage)> GetByIdAsync(Guid id);

    Task<(bool IsSuccess, string ErrorMessage)> AddAsync(T entity);

    Task<(bool IsSuccess, string ErrorMessage)> DeleteAsync(Guid id);
}