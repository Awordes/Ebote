namespace Ebote.API.Hubs;

public record WizardHubUserModel(
    string ConnectionId,
    Guid ProfileId,
    Guid? ActiveLobbyId);