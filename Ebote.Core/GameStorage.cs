namespace Ebote.Core;

public class GameStorage
{
    private Dictionary<Guid, GameLobby> GameLobbies { get; set; } = [];

    public GameLobby? GetGameLobby(Guid id)
    {
        if (GameLobbies.TryGetValue(id, out var lobby))
            return lobby;

        return null;
    }

    public Guid CreateLobby(Guid id, Guid creatorId)
    {
        var lobby = new GameLobby(id, creatorId);
        GameLobbies.TryAdd(lobby.Id, lobby);
        return lobby.Id;
    }
}
