import { Container, Graphics } from "pixi.js";
import { WizardHub } from "../../SignalR/WizardHub";
import { ScreenLoader } from "../ScreenLoader";
import { GameLobby } from "../../API";
import { WizardModel } from "../Components/WizardModel";

export class GameScreen extends Container {
    private wizardHub: WizardHub;
    private wizards: WizardModel[] = [];

    public static async Create(): Promise<GameScreen> {
        let gameScreen = new GameScreen();

        gameScreen.wizardHub = new WizardHub();

        let border = new Graphics();
        border.rect(0, 0, ScreenLoader.constants.lobbyWidth, ScreenLoader.constants.lobbyHeight);
        border.stroke({ width: 1, color: 0x000000 });
        border.alpha = 1;

        gameScreen.addChild(border);

        return gameScreen;
    }

    public async ConnectToLobby() {
        await this.wizardHub.connection.start();

        this.wizardHub.connection.on(WizardHub.getWizardActiveLobbyAsync,
            async (gameState: GameLobby) => { await this.UpdateState(gameState); });

        await this.wizardHub.connection.send(WizardHub.getWizardActiveLobbyAsync);``
    }

    public async InitState(gameState: GameLobby) {
        for (let element of gameState.wizards) {
            let wizard = await WizardModel.Create(element);
            this.wizards[element.id] = wizard;
            this.addChild(wizard);
        }

        await this.UpdateState(gameState);
    }

    public async UpdateState(gamestate: GameLobby) {
        for (let element of gamestate.wizards) {
            let wizard = this.wizards[element.id];
            if (wizard) {
                await wizard.UpdateWizard(element);
            }
        }
    }
}
