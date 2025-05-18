using Ebote.API.Hubs.Models;
using Ebote.Core;
using Ebote.Domain.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Ebote.API.Hubs;

[Authorize]
public class LobbyHub(IProfileRepository profileRepository, GameStorage gameStorage): Hub
{
    private static readonly Dictionary<string, WizardHubUserModel> Users = [];

    public override async Task OnConnectedAsync()
    {
        if (Context.UserIdentifier is null)
            throw new Exception("UserId not found");

        var profile = await profileRepository.GetByIdAsync(Guid.Parse(Context.UserIdentifier));

        Users.Add(
            Context.ConnectionId,
            new WizardHubUserModel(Context.ConnectionId, profile.Id, profile.ActiveLobby?.Id)
        );

        await base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        Users.Remove(Context.ConnectionId);
        return base.OnDisconnectedAsync(exception);
    }

    public async Task GetWizardActiveLobbyAsync()
    {
        if (!Users.TryGetValue(Context.ConnectionId, out var userModel))
            throw new Exception("Connection not found");

        if (userModel.ActiveLobbyId is null)
            throw new Exception("Active lobby not found");

        if (!gameStorage.Lobbies.TryGetValue(userModel.ActiveLobbyId.Value, out var gameLobby))
            throw new Exception("Lobby not found");

        Console.WriteLine($"User {Context.UserIdentifier} start watch lobby {gameLobby.Id}");

        do
        {
            await Clients.Caller.SendAsync(nameof(GetWizardActiveLobbyAsync), gameLobby);
            await Task.Delay(GameConstants.Consts.GameTickInMilliseconds);
        } while(Users.ContainsKey(Context.ConnectionId));

        Console.WriteLine($"User {Context.UserIdentifier} stop watch lobby {gameLobby.Id}");
    }
}