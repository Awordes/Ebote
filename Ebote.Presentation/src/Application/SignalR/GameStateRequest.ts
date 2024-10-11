import * as signalR from "@microsoft/signalr";
import { WizardHub } from "./SignalRRoutes";

export async function GetLobbyWizardList() {
    let connection = new signalR.HubConnectionBuilder()
    .withUrl(WizardHub.hubName)
    .build();

    connection.on(WizardHub.getLobbyWizardList.response, async () => {
        
    });

    await connection.start();
    await connection.send(WizardHub.getLobbyWizardList.request);
}