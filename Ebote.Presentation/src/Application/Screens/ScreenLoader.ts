import { Application, Assets } from "pixi.js";

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

export class AssetStore {
    [key: string]: any;

    public static readonly menuScroll = { alias: 'menuScroll', src: 'assets/svg/menu-scroll.svg', data: { parseAsGraphicsContext: true, }, };

    public static readonly wizard = { alias: 'wizard', src: 'assets/svg/wizard.svg', data: { parseAsGraphicsContext: true, }, };

    public static readonly buttonDefault = { alias: 'buttonDefault', src: 'assets/svg/button-default.svg', data: { parseAsGraphicsContext: true, }, };

    public static readonly buttonPressed = { alias: 'buttonPressed', src: 'assets/svg/button-pressed.svg', data: { parseAsGraphicsContext: true, }, };

    public static readonly MonocraftFont = { alias: 'Monocraft', src: 'assets/fonts/Monocraft.otf'}
}