using Ebote.Core;
using Ebote.Domain.Repositories;
using Ebote.Engine;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Ebote.API.Hubs;

[Authorize]
public class WizardHub(IProfileRepository profileRepository, GameStorage gameStorage): Hub
{
    private static readonly Dictionary<string, WizardHubUserModel> Users = [];

    public override async Task OnConnectedAsync()
    {
        if (Context.UserIdentifier is null)
            throw new Exception("UserId not found");

        var profile = await profileRepository.GetByIdAsync(Guid.Parse(Context.UserIdentifier));

        Users.Add(Context.ConnectionId, new WizardHubUserModel(Context.ConnectionId, profile.Id, profile.ActiveLobby?.Id));

        await base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        Users.Remove(Context.ConnectionId);
        return base.OnDisconnectedAsync(exception);
    }

    public void MoveWizard(Axis axis)
    {
        if (!Users.TryGetValue(Context.ConnectionId, out var userModel))
            throw new Exception("Connection not found");

        if (userModel.ActiveLobbyId is null)
            throw new Exception("Active lobby not found");

        if (!gameStorage.Lobbies.TryGetValue(userModel.ActiveLobbyId.Value, out var gameLobby))
            throw new Exception("Lobby not found");

        gameLobby.MoveWizard(userModel.ProfileId, axis);
    }

    public void Shoot()
    {
        if (!Users.TryGetValue(Context.ConnectionId, out var userModel))
            throw new Exception("Connection not found");

        if (userModel.ActiveLobbyId is null)
            throw new Exception("Active lobby not found");

        if (!gameStorage.Lobbies.TryGetValue(userModel.ActiveLobbyId.Value, out var gameLobby))
            throw new Exception("Lobby not found");

        gameLobby.Shoot(userModel.ProfileId);
    }

    public void Defence()
    {
        if (!Users.TryGetValue(Context.ConnectionId, out var userModel))
            throw new Exception("Connection not found");

        if (userModel.ActiveLobbyId is null)
            throw new Exception("Active lobby not found");

        if (!gameStorage.Lobbies.TryGetValue(userModel.ActiveLobbyId.Value, out var gameLobby))
            throw new Exception("Lobby not found");

        gameLobby.Defence(userModel.ProfileId);
    }

    public void Undefence()
    {
        if (!Users.TryGetValue(Context.ConnectionId, out var userModel))
            throw new Exception("Connection not found");

        if (userModel.ActiveLobbyId is null)
            throw new Exception("Active lobby not found");

        if (!gameStorage.Lobbies.TryGetValue(userModel.ActiveLobbyId.Value, out var gameLobby))
            throw new Exception("Lobby not found");

        gameLobby.Undefence(userModel.ProfileId);
    }
}
