import { FancyButton } from "@pixi/ui";
import { Assets, Graphics, HTMLText } from "pixi.js";
import { AssetStore } from "../../Utils/AssetStore";

export async function CreateButton (text?: string): Promise<FancyButton> {
    let button = new FancyButton({
        text: new HTMLText({
            text: text,
            style: {
                fontFamily: AssetStore.monocraftFont.alias,
                fontSize: 100,
            }
        }),
        padding: 3.9,
        defaultView: new Graphics(await Assets.load(AssetStore.buttonDefault)),
        pressedView: new Graphics(await Assets.load(AssetStore.buttonPressed)),
        hoverView: new Graphics(await Assets.load(AssetStore.buttonHover)),
        disabledView: new Graphics(await Assets.load(AssetStore.buttonDisabled)),
        textOffset: { y: -1.5 },
    });

    return button;
}