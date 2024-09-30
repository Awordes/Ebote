namespace Ebote.API.Models;

public class LoginModel
{
    public required string Login { get; set; }

    public required string PasswordHash { get; set; }
}
