import * as signalR from "@microsoft/signalr";

export class WizardHub {
    public readonly hubName = 'Wizard';
    public static readonly moveWizard = 'MoveWizard';
    public connection: signalR.HubConnection;

    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
        .withUrl(this.hubName)
        .build();
    }
}