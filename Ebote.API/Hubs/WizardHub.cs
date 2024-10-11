using Ebote.Core;
using Ebote.Domain.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Ebote.API.Hubs;

[Authorize]
public class WizardHub(IProfileRepository profileRepository, GameStorage gameStorage): Hub
{
    private static HashSet<string> Users = [];

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

    public async Task GetLobbyWizardList()
    {
        if (Context.UserIdentifier is null)
            throw new Exception("UserId not found");
        var profile = await profileRepository.GetByIdAsync(Guid.Parse(Context.UserIdentifier));

        if (profile.ActiveLobby is null)
            throw new Exception("Active lobby not found");

        var gameLobby = gameStorage.GetGameLobby(profile.ActiveLobby.Id)
            ?? throw new Exception("Lobby not found");

        do
        {
            await Clients.Caller.SendAsync(nameof(GetLobbyWizardList), gameLobby.WizardsToAdd);
            await Task.Delay(GameConstants.GameTickInMilliseconds);
        } while(Users.Contains(Context.ConnectionId));
    }
}
