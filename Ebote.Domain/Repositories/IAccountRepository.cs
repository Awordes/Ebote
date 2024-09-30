using Ebote.Domain.Entities;

namespace Ebote.Domain.Repositories;

public interface IAccountRepository: IRepository<Account>
{
    Task<bool> CheckAccountAsync(string login, string passwordHash);
}
