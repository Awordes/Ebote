namespace Ebote.API.Hubs.Models;

public record WizardHubUserModel(
    string ConnectionId,
    Guid ProfileId,
    Guid? ActiveLobbyId);