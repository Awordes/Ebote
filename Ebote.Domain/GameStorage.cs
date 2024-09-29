namespace Ebote.Domain;

public class GameStorage
{
    private Dictionary<Guid, GameLobby> GameLobbies { get; set; } = [];

    public GameLobby? GetGameLobby(Guid id)
    {
        if (GameLobbies.TryGetValue(id, out var lobby))
            return lobby;

        return null;
    }

    public Guid CreateLobby(Guid creatorId)
    {
        var lobby = new GameLobby(creatorId);
        GameLobbies.TryAdd(lobby.Id, lobby);
        return lobby.Id;
    }
}
