import { Container, Graphics } from "pixi.js";
import { LobbyHub } from "../../SignalR/LobbyHub";
import { ScreenLoader } from "../ScreenLoader";
import { GameLobby, Axis } from "../../API";
import { WizardView } from "../Components/WizardView";
import { WizardHub } from "../../SignalR/WizardHub";
import { HubConnectionState } from "@microsoft/signalr";
import { Route } from "../../Router/Router";

export class GameScreen extends Container {
    private lobbyHub: LobbyHub = new LobbyHub();
    private wizardHub: WizardHub = new WizardHub();
    private wizards: WizardView[] = [];
    private moveAxis: Axis = { x: 0, y: 0 };
    private keyEventHandler = this.KeyEvent.bind(this);
    private frameEventHandler = this.FrameEvent.bind(this);
    private isGameStarted: boolean = false;

    public static async Create(): Promise<GameScreen> {
        let gameScreen = new GameScreen();

        let border = new Graphics();
        border.rect(0, 0, ScreenLoader.constants.lobbyWidth, ScreenLoader.constants.lobbyHeight);
        border.stroke({ width: 1, color: 0x000000 });
        border.alpha = 1;

        gameScreen.addChild(border);

        return gameScreen;
    }

    public async StartLobbyListener() {
        if (this.lobbyHub.connection.state != HubConnectionState.Disconnected) {
            await this.lobbyHub.connection.stop();
        }

        this.lobbyHub.connection.on(
            LobbyHub.getWizardActiveLobbyAsync,
            async (gameState: GameLobby) => {
                if (gameState.isGameStarted && !this.isGameStarted) {
                    this.isGameStarted = true;
                    await Route('lobby');
                }
                await this.UpdateState(gameState);
            }
        );

        await this.lobbyHub.connection.start();
        await this.lobbyHub.connection.send(LobbyHub.getWizardActiveLobbyAsync);
    }

    public async StopLobbyListener() {
        if (this.lobbyHub.connection.state != HubConnectionState.Disconnected) {
            await this.lobbyHub.connection.stop();
        }
    }

    public async StartGame() {
        await this.wizardHub.connection.start();
        window.addEventListener("keydown", this.keyEventHandler);
        window.addEventListener("keyup", this.keyEventHandler);
        ScreenLoader.app.ticker.add(this.frameEventHandler);
        this.moveAxis = { x: 0, y: 0};
    }

    public async StopGame() {
        await this.wizardHub.connection.stop();
        window.removeEventListener("keydown", this.keyEventHandler);
        window.removeEventListener("keyup", this.keyEventHandler);
        ScreenLoader.app.ticker.remove(this.frameEventHandler);
        this.moveAxis = { x: 0, y: 0};
    }

    public async UpdateState(gamestate: GameLobby) {
        for (let element of gamestate.wizards) {
            let wizard = this.wizards[element.id];
            if (!wizard) {
                let newwizard = await WizardView.Create(element);
                this.wizards[element.id] = newwizard;
                this.addChild(newwizard);
            }
            await wizard.UpdateWizard(element);
        }
    }

    private async KeyEvent(e: KeyboardEvent) {
        let key = e.key;

        if (key == 'w' || key == 'ц' || key == 'W' || key == 'Ц' || key == 'ArrowUp') {
            this.moveAxis.y = e.type == 'keydown' ? -1 : 0;
        } else if (key == 'd' || key == 'в' || key == 'D' || key == 'В' || key == 'ArrowRight') {
            this.moveAxis.x = e.type == 'keydown' ? 1 : 0;
        } else if (key == 's' || key == 'ы' || key == 'S' || key == 'Ы' || key == 'ArrowDown') {
            this.moveAxis.y = e.type == 'keydown' ? 1 : 0;
        } else if (key == 'a' || key == 'ф' || key == 'A' || key == 'Ф' || key == 'ArrowLeft') {
            this.moveAxis.x = e.type == 'keydown' ? -1 : 0;
        }
    }

    private async FrameEvent() {
        if (this.moveAxis.x != 0 || this.moveAxis.y != 0) {
            await this.wizardHub.connection.send(LobbyHub.moveWizard, this.moveAxis );
        }
    }
}
