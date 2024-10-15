import { Assets, Container, Graphics, HTMLText } from "pixi.js";
import { CreateButton } from "./CreateButton";
import { AssetStore } from "../Utils/AssetStore";
import { FancyButton } from "@pixi/ui";
import { ScaleAndCenterToContainer } from "../Utils/SizeHelper";

export class Modal extends Container {
    public okButton: FancyButton;
    private message: HTMLText;
    private background: Graphics;
    
    public static async Create(): Promise<Modal> {
        let modal = new Modal();

        modal.background = new Graphics(await Assets.load(AssetStore.modalBackground));
        modal.okButton = await CreateButton('OK');
        modal.okButton.position.set(
            (modal.background.width - modal.okButton.width) / 2,
            modal.background.height - modal.okButton.height - 4
        );

        modal.message = new HTMLText({
            text: 'test text',
            style: {
                fontFamily: AssetStore.MonocraftFont.alias,
                fontSize: 100,
                wordWrap: true,
                wordWrapWidth: 2700
            }
        });

        ScaleAndCenterToContainer(modal.message, modal.background, 0.9);

        modal.addChild(modal.background);
        modal.addChild(modal.message);
        modal.addChild(modal.okButton);

        return modal;
    }

    public SetText(text: string) {
        this.message.text = text;
        ScaleAndCenterToContainer(this.message, this.background, 0.7);
    }
}