using Ebote.Domain.Entities;
using Ebote.Domain.Repositories;
using Ebote.Infrastructure.DbContexts;
using Ebote.Infrastructure.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Ebote.Infrastructure.Repositories;

public class ProfileRepository(PostgresDbContext dbContext) : IProfileRepository
{
    public async Task<Profile> GetByIdAsync(Guid id)
        => await dbContext.Profiles
            .Include(x => x.ActiveLobby)
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id)
            ?? throw new EntityNotFoundException(nameof(Profile), nameof(Profile.Id), id.ToString());

    public async Task UpdateActiveLobbyAsync(Guid profileId, Guid lobbyId)
    {
        var profile = await dbContext.Profiles
            .Include(x => x.ActiveLobby)
            .FirstOrDefaultAsync(x => x.Id == profileId)
            ?? throw new EntityNotFoundException(nameof(Profile), nameof(Profile.Id), profileId.ToString());

        var newLobby = await dbContext.Lobbies
            .FirstOrDefaultAsync(x => x.Id == lobbyId)
            ?? throw new EntityNotFoundException(nameof(Lobby), nameof(Lobby.Id), lobbyId.ToString());

        profile.ActiveLobby = newLobby;

        await dbContext.SaveChangesAsync();
    }

    public async Task ClearActiveLobbyAsync(Guid profileId)
    {
        var profile = await dbContext.Profiles
            .Include(x => x.ActiveLobby)
            .FirstOrDefaultAsync(x => x.Id == profileId)
            ?? throw new EntityNotFoundException(nameof(Profile), nameof(Profile.Id), profileId.ToString());

        profile.ActiveLobby = null;
        
        await dbContext.SaveChangesAsync();
    }
}
