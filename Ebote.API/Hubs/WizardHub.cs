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

        do
        {
            Console.WriteLine(DateTime.Now);
            await Task.Delay(GameConstants.GameTickInMilliseconds);
        } while(Users.Contains(Context.ConnectionId));
    }
}
