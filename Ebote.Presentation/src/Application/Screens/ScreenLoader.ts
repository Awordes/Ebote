import { Application, Assets } from "pixi.js";
import { AssetStore } from "../Utils/AssetStore";

export class ScreenLoader {
    public static app: Application;
    public static assets: any;

    public static async Init() {
        this.app = new Application();

        await this.app.init({
            resizeTo: window,
            antialias: true,
            backgroundAlpha: 0.3
        });

        this.app.canvas.style.position = 'absolute';
        this.app.canvas.style.right = '0';
        this.app.canvas.style.bottom = '0';

        document.body.appendChild(this.app.canvas);
        this.assets = await Assets.load(Object.values(AssetStore));
    }
}