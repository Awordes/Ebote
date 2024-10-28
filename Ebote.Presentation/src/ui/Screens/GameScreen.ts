import { Container, Graphics } from "pixi.js";
import { WizardHub } from "../../SignalR/WizardHub";
import { getConstants } from "../../API";

export class GameScreen extends Container {
    private wizardHub: WizardHub;

    public static async Create(): Promise<GameScreen> {
        let lobbyScreen = new GameScreen();

        lobbyScreen.wizardHub = new WizardHub();

        let gameConsts = await getConstants();

        let border = new Graphics();
        border.rect(0, 0, gameConsts.data.lobbyWidth, gameConsts.data.lobbyHeight);
        border.stroke({ width: 1, color: 0x000000 });
        border.alpha = 0;

        lobbyScreen.addChild(border);

        return lobbyScreen;
    }

    public async ConnectToLobby() {
        await this.wizardHub.connection.start();
        await this.wizardHub.connection.send(WizardHub.getWizardActiveLobbyAsync);
    }
}