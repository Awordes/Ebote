namespace Ebote.Domain.Entities;

public class Account
{
    public Guid Id { get; private init; } = Guid.NewGuid();

    public required string Login { get; set; }

    public required string PasswordHash { get; set; }

    public required Guid ProfileId { get; set; }

    public required Profile Profile { get; set; }
}
