import { Application } from "pixi.js";

export class ScreenLoader {
    public static app: Application

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
    }
}