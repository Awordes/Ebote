import { Application, Assets } from "pixi.js";
import { ModalStore } from "./Components/ModalStore";
import { MainScreen } from "./Screens/MainScreen";
import { ScaleAndCenterToContainer } from "../Utils/SizeHelper";
import { AssetStore } from "../Utils/AssetStore";

export class ScreenLoader {
    public static app: Application;
    public static modalStore: ModalStore;
    public static mainScreen: MainScreen;

    public static async Init() {
        this.app = await InitApplication();
        document.body.appendChild(this.app.canvas);

        this.modalStore = await ModalStore.Create();
        this.modalStore.scale.set(3);

        this.mainScreen = await MainScreen.Create();
        ScaleAndCenterToContainer(this.mainScreen, this.app.canvas, 0.9);

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
        backgroundAlpha: 0.3
    });

    app.canvas.style.position = 'absolute';
    app.canvas.style.right = '0';
    app.canvas.style.bottom = '0';

    await Assets.load(Object.values(AssetStore));

    return app;
}
