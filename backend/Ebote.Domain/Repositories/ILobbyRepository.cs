using Ebote.Domain.Entities;

namespace Ebote.Domain.Repositories;

public interface ILobbyRepository: IRepository<Lobby>
{
    Task<Lobby> CreateAsync(Guid creatorId);

    Task<Lobby[]> GetListAsync(Guid creatorId, int? page, int? pageSize);
}
