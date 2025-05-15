import * as signalR from "@microsoft/signalr";

export class WizardHub {
    public readonly hubName = 'wizard';
    public static readonly moveWizard = 'MoveWizard';
    public static readonly shoot = 'Shoot';
    public static readonly defence = 'Defence';
    public static readonly undefence = 'Undefence';
    public connection: signalR.HubConnection;

    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
        .withUrl(this.hubName)
        .build();
    }
}