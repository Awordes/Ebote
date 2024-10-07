using Ebote.Domain.Entities;

namespace Ebote.Domain.Repositories;

public interface IProfileRepository : IRepository<Profile>
{
    Task UpdateActiveLobbyAsync(Guid profileId, Guid lobbyId);

    Task ClearActiveLobbyAsync(Guid profileId);
}
