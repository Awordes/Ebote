using Ebote.Domain.Entities;

namespace Ebote.Domain.Repositories;

public interface IAccountRepository: IRepository<Account>
{
    Task<Account> CreateAsync(string login, string passwordHash);

    Task<Account?> CheckAccountAsync(string login, string passwordHash);
}
