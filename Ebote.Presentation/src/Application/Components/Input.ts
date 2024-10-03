import { Assets, Container, Graphics, Text } from "pixi.js";
import { AssetStore } from "../Utils/AssetStore";
import { InputField } from "./InputField";

export class InputComponent {
    public static async Init(placeholder?: string): Promise<Container> {
        return new InputField(placeholder, {
            text: new Text({
                text: " ",
                style: {
                    fontFamily: AssetStore.MonocraftFont.alias,
                    fontSize: 100,
                }
            }),
            padding: 3.9,
            defaultView: new Graphics(await Assets.load(AssetStore.input)),
            textOffset: { y: -1.5 },
        });
    }
}