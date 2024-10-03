import { FancyButton } from "@pixi/ui";
import { Assets, Graphics, Text } from "pixi.js";
import { AssetStore } from "../Utils/AssetStore";

export async function CreateButton (text?: string): Promise<FancyButton> {
    var button = new FancyButton({
        text: new Text({
            text: text,
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