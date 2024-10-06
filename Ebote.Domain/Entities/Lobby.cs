namespace Ebote.Domain.Entities;

public class Lobby
{
    public Guid Id { get; private init; } = Guid.NewGuid();

    public DateTime CreatedAt { get; private init; } = DateTime.UtcNow;

    public required Profile Creator { get; set; }
}
