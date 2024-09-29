import { Assets, Graphics } from "pixi.js";
import { AssetStore, ScreenLoader } from "../ScreenLoader";

export class MainScreen {
    public static async Init() {
        var scroll = new Graphics(await Assets.load(AssetStore.menuScroll));
        ScreenLoader.app.stage.addChild(scroll);

        const scrollBounds = scroll.getLocalBounds();
        scroll.pivot.set((scrollBounds.x + scrollBounds.width) / 2, (scrollBounds.y + scrollBounds.height) / 2);
        scroll.position.set(ScreenLoader.app.screen.width / 2, ScreenLoader.app.screen.height / 2);
    
        var scaleX = scrollBounds.width < window.innerWidth
            ? window.innerWidth / scrollBounds.width
            : scrollBounds.width / window.innerWidth;
    
        var scaleY = scrollBounds.height < window.innerHeight
            ? window.innerHeight / scrollBounds.height
            : scrollBounds.height / window.innerHeight;
    
        scroll.scale.set(scaleX * 0.7, scaleY * 0.7);
    }
}