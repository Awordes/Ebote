import * as signalR from "@microsoft/signalr";

export class LobbyHub {
    public readonly hubName = 'LobbyHub';
    public static readonly getWizardActiveLobbyAsync = 'GetWizardActiveLobbyAsync';
    public static readonly moveWizard = 'MoveWizard';
    public connection: signalR.HubConnection;

    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
        .withUrl(this.hubName)
        .build();
    }
}