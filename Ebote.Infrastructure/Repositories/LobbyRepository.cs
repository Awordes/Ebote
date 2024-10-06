using Ebote.Domain.Entities;
using Ebote.Domain.Repositories;
using Ebote.Infrastructure.DbContexts;
using Ebote.Infrastructure.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Ebote.Infrastructure.Repositories;

public class LobbyRepository(PostgresDbContext dbContext) : ILobbyRepository
{
    public async Task<Lobby> GetByIdAsync(Guid id)
        => await dbContext.Lobbies.FirstOrDefaultAsync(x => x.Id == id)
            ?? throw new EntityNotFoundException(nameof(Lobby), nameof(Lobby.Id), id.ToString());

    public async Task<Lobby> CreateAsync(Guid creatorId)
    {
        var creator = await dbContext.Profiles.FirstOrDefaultAsync(x => x.Id == creatorId)
            ?? throw new EntityNotFoundException(nameof(Profile), nameof(Profile.Id), creatorId.ToString());
        
        var lobby = new Lobby() { Creator = creator };

        dbContext.Add(lobby);
        await dbContext.SaveChangesAsync();

        return lobby;
    }

    public async Task<Lobby[]> GetListAsync(Guid creatorId, int? page, int? pageSize)
    {
        page ??= 1;
        pageSize ??= 10;

        if (!await dbContext.Profiles.AsNoTracking().AnyAsync(x => x.Id == creatorId))
            throw new EntityNotFoundException(nameof(Profile), nameof(Profile.Id), creatorId.ToString());
        
        return await dbContext.Lobbies
            .Include(x => x.Creator)
            .Where(x => x.Creator.Id == creatorId)
            .OrderByDescending(x => x.CreatedAt)
            .Skip(pageSize.Value * (page.Value - 1))
            .Take(pageSize.Value)
            .AsNoTracking()
            .ToArrayAsync();
    }
}
