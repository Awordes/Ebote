import { Application, Assets } from "pixi.js";
import { ModalStore } from "./Components/ModalStore";
import { CreateMainScreen, MainScreen } from "./Screens/MainScreen";
import { ScaleAndCenterToContainer } from "../Utils/SizeHelper";
import { AssetStore } from "../Utils/AssetStore";
import { GameScreen } from "./Screens/GameScreen";
import { GameConstantsModel, getConstants } from "../API";

export class ScreenLoader {
    public static app: Application;
    public static modalStore: ModalStore;
    public static mainScreen: MainScreen;
    public static gameScreen: GameScreen;
    public static constants: GameConstantsModel;

    public static async Init() {
        this.app = await InitApplication();
        document.body.appendChild(this.app.canvas);

        this.constants = (await getConstants()).data;

        this.modalStore = await ModalStore.Create();
        this.modalStore.scale.set(3);

        this.mainScreen = await CreateMainScreen();
        ScaleAndCenterToContainer(this.mainScreen, this.app.canvas, 0.9);

        this.gameScreen = await  GameScreen.Create();
        ScaleAndCenterToContainer(this.gameScreen, this.app.canvas);

        this.app.stage.addChild(this.gameScreen);
        this.app.stage.addChild(this.mainScreen);
        this.app.stage.addChild(this.modalStore);
    }

    public static async ShowModal(text: string) {
        await this.modalStore.ShowModal(text);
    }
}

async function InitApplication(): Promise<Application> {
    let app = new Application();

    await app.init({
        resizeTo: window,
        antialias: true,
        backgroundAlpha: 0.3,
        // backgroundColor: 0x66a824
    });

    app.canvas.style.position = 'absolute';
    app.canvas.style.right = '0';
    app.canvas.style.bottom = '0';

    await Assets.load(Object.values(AssetStore));

    return app;
}
