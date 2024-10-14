namespace Ebote.Core;

public class GameStorage
{
    public Dictionary<Guid, GameLobby> Lobbies { get; set; } = [];
}
