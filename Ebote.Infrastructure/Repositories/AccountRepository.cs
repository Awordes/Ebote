using Ebote.Domain.Entities;
using Ebote.Domain.Repositories;
using Ebote.Infrastructure.DbContexts;
using Microsoft.EntityFrameworkCore;

namespace Ebote.Infrastructure.Repositories;

public class AccountRepository(PostgresDbContext dbContext) : IAccountRepository
{
    public async Task AddAsync(Account entity)
    {
        dbContext.Add(entity);
        await dbContext.SaveChangesAsync();
    }

    public async Task<bool> CheckAccountAsync(string login, string passwordHash)
        => await dbContext.Accounts.AnyAsync(x => x.Login == login && x.PasswordHash == passwordHash);

    public Task DeleteAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public async Task<Account> GetByIdAsync(Guid id)
        => await dbContext.Accounts.FirstOrDefaultAsync(x => x.Id == id)
            ?? throw new Exception("Account not found");
}
