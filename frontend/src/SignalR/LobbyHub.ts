import * as signalR from "@microsoft/signalr";

export class LobbyHub {
    public readonly hubName = 'lobby';
    public static readonly getWizardActiveLobbyAsync = 'GetWizardActiveLobbyAsync';
    public connection: signalR.HubConnection;

    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
        .withUrl(this.hubName)
        .build();
    }
}