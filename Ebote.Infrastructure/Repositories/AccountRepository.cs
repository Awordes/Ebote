using Ebote.Domain.Entities;
using Ebote.Domain.Repositories;
using Ebote.Infrastructure.DbContexts;
using Ebote.Infrastructure.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Ebote.Infrastructure.Repositories;

public class AccountRepository(PostgresDbContext dbContext) : IAccountRepository
{
    public async Task<Account> GetByIdAsync(Guid id)
        => await dbContext.Accounts
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id)
            ?? throw new EntityNotFoundException(nameof(Account), nameof(Account.Id), id.ToString());

    public async Task<Account?> CheckAccountAsync(string login, string passwordHash)
        => await dbContext.Accounts
            .Include(x => x.Profile)
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Login == login && x.PasswordHash == passwordHash);

    public async Task<Account> CreateAsync(string login, string passwordHash)
    {
        var profile = new Profile();
        dbContext.Add(profile);

        var account = new Account
        {
            Login = login,
            PasswordHash = passwordHash,
            Profile = profile,
            ProfileId = profile.Id
        };
        dbContext.Add(account);

        await dbContext.SaveChangesAsync();

        return account;
    }
}
