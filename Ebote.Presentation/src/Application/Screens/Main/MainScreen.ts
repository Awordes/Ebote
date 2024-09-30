import { AssetStore, ScreenLoader } from "../ScreenLoader";
import { CreateLobbyButton } from "../../Components/CreateLobbyButton";
import { Assets, Container, Graphics } from "pixi.js";
import { SizeHelper } from "../../Utils/SizeHelper";
import { FancyButton } from "@pixi/ui";

export class MainScreen {
    private static mainScreen: Container;
    private static scroll: Graphics;
    private static createLobbyButton: FancyButton;
    private static textFake: Graphics;

    public static async Init() {
        this.mainScreen = new Container();
        ScreenLoader.app.stage.addChild(this.mainScreen);
        
        this.scroll = new Graphics(await Assets.load(AssetStore.menuScroll));
        this.mainScreen.addChild(this.scroll);
        
        this.createLobbyButton = await CreateLobbyButton.Init();
        this.mainScreen.addChild(this.createLobbyButton);

        this.textFake = new Graphics();
        this.textFake.rect(0, 0, 210, 60);
        this.textFake.fill(0xde3249);

        this.mainScreen.addChild(this.textFake);

        await this.Resize();
    }

    public static async Resize(): Promise<void> {
        SizeHelper.CenterPivot(this.textFake);
        SizeHelper.CenterPivot(this.scroll);
        SizeHelper.CenterPivot(this.createLobbyButton);

        this.textFake.x = this.mainScreen.width / 2;
        this. scroll.x = this.textFake.x;
        this.createLobbyButton.x = this.scroll.x;

        this.textFake.y = this.textFake.height / 2;
        this.scroll.y = this.textFake.height + this.scroll.height / 2;
        this.createLobbyButton.y = this.scroll.y;

        SizeHelper.CenterPivot(this.mainScreen);

        this.mainScreen.position.set(
            ScreenLoader.app.screen.width / 2,
            ScreenLoader.app.screen.height / 2
        );

        this.mainScreen.scale.set(SizeHelper.GetScaleFromValues(
            this.mainScreen.width,
            this.mainScreen.height,
            ScreenLoader.app.screen.width,
            ScreenLoader.app.screen.height,
            0.9
        ));
    }
}