import * as signalR from "@microsoft/signalr";
import { WizardHub } from "./SignalRRoutes";

export async function GetLobbyWizardList() {
    const connection = new signalR.HubConnectionBuilder()
    .withUrl(WizardHub.hubName)
    .build();

    await connection.start();
    await connection.send(WizardHub.getLobbyWizardList.request);
}