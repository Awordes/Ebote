import { Container } from "pixi.js";
import { WizardHub } from "../../SignalR/WizardHub";
import { GameLobby } from "../../API";

export class GameScreen extends Container {
    private wizardHub: WizardHub;

    public static async Create(isLobbyCreated: boolean): Promise<GameScreen> {
        let lobbyScreen = new GameScreen();

        lobbyScreen.wizardHub = new WizardHub();

        if (isLobbyCreated) {
            await lobbyScreen.wizardHub.connection.start();
            await lobbyScreen.wizardHub.connection.send(WizardHub.getWizardActiveLobbyAsync);
        }

        lobbyScreen.wizardHub.connection.on(WizardHub.getWizardActiveLobbyAsync, (gamestate: GameLobby) =>{
            console.log('add wizard');
        });

        return lobbyScreen;
    }
}