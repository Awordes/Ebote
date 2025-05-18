namespace Ebote.API.Models;

public class AccountModel
{
    public required string Login { get; set; }

    public required string PasswordHash { get; set; }
}
