import { Application, Assets } from "pixi.js";
import { AssetStore } from "../Utils/AssetStore";
import { Modal } from "../Components/Modal";
import { ScaleAndCenterToContainer } from "../Utils/SizeHelper";

export class ScreenLoader {
    public static app: Application;
    public static assets: any;
    private static modal: Modal;

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

        this.modal = await Modal.Create();
        ScaleAndCenterToContainer(this.modal, this.app.canvas, 0.4);
        this.modal.okButton.on('pointerup', () => { this.app.stage.removeChild(this.modal); });
    }

    public static ShowModal(text: string) {
        this.modal.SetText(text);
        this.app.stage.addChild(this.modal);
    }
}