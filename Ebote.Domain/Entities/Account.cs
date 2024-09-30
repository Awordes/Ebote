namespace Ebote.Domain.Entities;

public class Account
{
    public Guid Id { get; set; }

    public required string Login { get; set; }

    public required string PasswordHash { get; set; }
}
