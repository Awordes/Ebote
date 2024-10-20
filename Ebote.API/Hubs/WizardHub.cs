using Ebote.Core;
using Ebote.Domain.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Ebote.API.Hubs;

[Authorize]
public class WizardHub(IProfileRepository profileRepository, GameStorage gameStorage): Hub
{
    private static readonly HashSet<string> Users = [];

    public override Task OnConnectedAsync()
    {
        Users.Add(Context.ConnectionId);
        return base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        Users.Remove(Context.ConnectionId);
        return base.OnDisconnectedAsync(exception);
    }

    public async Task GetWizardActiveLobbyAsync()
    {
        if (Context.UserIdentifier is null)
            throw new Exception("UserId not found");

        var profile = await profileRepository.GetByIdAsync(Guid.Parse(Context.UserIdentifier));

        if (profile.ActiveLobby is null)
            throw new Exception("Active lobby not found");

        if (!gameStorage.Lobbies.TryGetValue(profile.ActiveLobby.Id, out var gameLobby))
            throw new Exception("Lobby not found");

        Console.WriteLine($"User {Context.UserIdentifier} start watch lobby {gameLobby.Id}");

        do
        {
            await Clients.Caller.SendAsync(nameof(GetWizardActiveLobbyAsync), gameLobby);
            await Task.Delay(GameConstants.GameTickInMilliseconds);
        } while(Users.Contains(Context.ConnectionId));

        Console.WriteLine($"User {Context.UserIdentifier} stop watch lobby {gameLobby.Id}");
    }
}
