import { Application, Assets } from "pixi.js";
import { AssetStore } from "../utils/assetStore";

export class ScreenLoader {
    public static app: Application;

    public static async Init() {
        this.app = await InitApplication();        
        document.body.appendChild(this.app.canvas);
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
