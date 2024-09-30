import { FancyButton } from "@pixi/ui";
import { Assets, Graphics, Text } from "pixi.js";
import { TextService } from "../Localization/TextService";
import { AssetStore } from "../Screens/ScreenLoader";

export class CreateLobbyButton {
    public static async Init(): Promise<FancyButton> {

        var button = new FancyButton({
            text: new Text({
                text: TextService.GetStringValue('createLobby'),
                style: {
                    fontFamily: AssetStore.MonocraftFont.alias,
                    fontSize: 100,
                }
            }),
            padding: 3.9,
            defaultView: new Graphics(await Assets.load(AssetStore.buttonDefault)),
            pressedView: new Graphics(await Assets.load(AssetStore.buttonPressed)),
            textOffset: { y: -1.5 },
        });

        return button;
    }
}