namespace Ebote.Domain.Entities;

public class Profile
{
    public Guid Id { get; private init; } = Guid.NewGuid();

    public Lobby? ActiveLobby { get; set; }

    public ICollection<Lobby>? Lobbies { get; set; }
}
