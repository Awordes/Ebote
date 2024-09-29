import { Assets, ContainerChild, Graphics } from "pixi.js";
import { AssetStore, ScreenLoader } from "../ScreenLoader";
import { Button } from "@pixi/ui";

export class MainScreen {
    public static async Init() {
        var scroll = await this.CreateScroll();
        ScreenLoader.app.stage.addChild(scroll);

        var startButton = await this.CreateStartGameButton(scroll);
        ScreenLoader.app.stage.addChild(startButton);
    }

    private static async CreateScroll(): Promise<ContainerChild> {
        var scroll = new Graphics(await Assets.load(AssetStore.menuScroll));

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

        return scroll;
    }

    private static async CreateStartGameButton(scroll: ContainerChild): Promise<ContainerChild> {
        var button = new Button(new Graphics().rect(0, 0, 500, 200).fill(0xFFFFFF));
      
       button.onPress.connect(() => console.log('onPress'));
      
       return button.view;
    }
}
