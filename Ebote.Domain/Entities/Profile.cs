namespace Ebote.Domain.Entities;

public class Profile
{
    public Guid Id { get; private init; } = Guid.NewGuid();

    public ICollection<Lobby>? Lobbies { get; set; }
}
