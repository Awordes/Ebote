import { ScreenLoader } from "../ScreenLoader";
import { Assets, Container, Graphics, } from "pixi.js";
import { SizeHelper } from "../../Utils/SizeHelper";
import { getAccountCheckAuth } from "../../../client";
import { AssetStore } from "../../Utils/AssetStore";
import { CreateMenuScroll } from "../../Components/CreateMenuScroll";
import { CreateLoginForm } from "../../Components/LoginForm";
import { CreateButton } from "../../Components/CreateButton";
import { TextService } from "../../Localization/TextService";

export class MainScreen {
    public static async Init() {
        var mainScreen = new Container();
        ScreenLoader.app.stage.addChild(mainScreen);
        
        var gameName = new Graphics(await Assets.load(AssetStore.gameName));
        mainScreen.addChild(gameName);

        var scroll = await CreateMenuScroll();
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

        if (result.response.status == 200) {            
            var createLobbyButton = await CreateButton(TextService.GetStringValue('createLobby'));
            scroll.addChild(createLobbyButton);
            createLobbyButton.position.set((scroll.width - createLobbyButton.width) / 2, (scroll.height - createLobbyButton.height) / 2);
        } else {
            var loginForm = await CreateLoginForm();
            scroll.addChild(loginForm);

            loginForm.scale.set(SizeHelper.GetScaleFromContainers(loginForm, scroll, 0.6));
            loginForm.position.set((scroll.width - loginForm.width) / 2, (scroll.height - loginForm.height) / 2);
        }
    }
}