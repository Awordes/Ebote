import { ScreenLoader } from "../ScreenLoader";
import { Assets, Container, Graphics, } from "pixi.js";
import { SizeHelper } from "../../Utils/SizeHelper";
import { getAccountCheckAuth } from "../../../client";
import { LoginForm } from "../../Components/LoginForm";
import { AssetStore } from "../../Utils/AssetStore";
import { MenuScroll } from "../../Components/MenuScroll";

export class MainScreen {
    public static async Init() {
        var mainScreen = new Container();
        ScreenLoader.app.stage.addChild(mainScreen);
        
        var gameName = new Graphics(await Assets.load(AssetStore.gameName));
        mainScreen.addChild(gameName);

        var scroll = await MenuScroll.Init();
        mainScreen.addChild(scroll);
        scroll.position.set(gameName.x, gameName.height);

        SizeHelper.CenterPivot(mainScreen);

        mainScreen.position.set(
            ScreenLoader.app.screen.width / 2,
            ScreenLoader.app.screen.height / 2
        );

        mainScreen.scale.set(SizeHelper.GetScaleFromValues(
            mainScreen.width,
            mainScreen.height,
            ScreenLoader.app.screen.width,
            ScreenLoader.app.screen.height,
            0.9
        ));

        var result = await getAccountCheckAuth();

        if (result.response.status != 200)
        {
            var loginForm = await LoginForm.Init();
            scroll.addChild(loginForm);
            
            SizeHelper.CenterPivot(loginForm);

            loginForm.position.set(scroll.width / 2, scroll.height / 2);
        }
    }
}