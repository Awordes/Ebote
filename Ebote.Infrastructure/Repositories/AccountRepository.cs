using Ebote.Domain.Entities;
using Ebote.Domain.Repositories;
using Ebote.Infrastructure.DbContexts;
using Microsoft.EntityFrameworkCore;

namespace Ebote.Infrastructure.Repositories;

public class AccountRepository(PostrgresDbContext dbContext) : IAccountRepository
{
    public Task<(bool IsSuccess, string ErrorMessage)> AddAsync(Account entity)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> CheckAccountAsync(string login, string passwordHash)
        => await dbContext.Accounts.AnyAsync(x => x.Login == login && x.PasswordHash == passwordHash);

    public Task<(bool IsSuccess, string ErrorMessage)> DeleteAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<(Account? Entity, bool IsSuccess, string ErrorMessage)> GetByIdAsync(Guid id)
    {
        throw new NotImplementedException();
    }
}
