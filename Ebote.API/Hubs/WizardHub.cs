using Ebote.Domain;
using Ebote.Engine;
using Microsoft.AspNetCore.SignalR;

namespace Ebote.API.Hubs;

public class WizardHub(GameStorage gameStorage): Hub
{
    public async Task MoveWizard(Guid lobbyId, Guid wizardId, Axis axis)
    {

    }

    public async Task GameState(Guid lobbyId)
    {
        await Clients.Caller.SendAsync(nameof(GameState), gameStorage.GetGameLobby(lobbyId));
    }
}
