import { FancyButton, RadioGroup } from "@pixi/ui";
import { Container, Graphics, HTMLText } from "pixi.js";
import { CreateButton } from "./CreateButton";
import { TextService } from "../Localization/TextService";
import { SideType } from "../../client";
import { CreateWizardSelector } from "./CreateWizardSelector";
import { InputField } from "./InputField";
import { WizardDescriptions } from "../Utils/WizardDescriptions";
import { AssetStore } from "../Utils/AssetStore";
import { ScaleContainer } from "../Utils/SizeHelper";

export class LobbyForm extends Container {
    public backButton: FancyButton;
    public magicType: RadioGroup;
    public sideType: SideType;
    public wizardName: InputField;
    public wizardDescription: Container;

    private airDescription: DescriptionBox;
    private earthDescription: DescriptionBox;
    private fireDescription: DescriptionBox;
    private waterDescription: DescriptionBox;

    public static async Create(): Promise<LobbyForm> {
        var lobbyForm = new LobbyForm();

        lobbyForm.backButton = await CreateButton(TextService.GetStringValue('back'));
        lobbyForm.addChild(lobbyForm.backButton);
        lobbyForm.backButton.scale.set(2);

        lobbyForm.wizardName = await InputField.Create(TextService.GetStringValue('enterName'));
        lobbyForm.addChild(lobbyForm.wizardName);
        lobbyForm.wizardName.position.set(
            lobbyForm.backButton.width + 5,
            lobbyForm.backButton.y
        );
        lobbyForm.wizardName.scale.set(2);

        lobbyForm.magicType = await CreateWizardSelector();
        lobbyForm.addChild(lobbyForm.magicType);
        lobbyForm.magicType.position.set(
            lobbyForm.backButton.x,
            lobbyForm.backButton.height + 5
        );

        lobbyForm.magicType.onChange.connect((selectedItemID: number, selectedVal: string) => {
            console.log(selectedItemID);
            
            switch (selectedItemID)
            {
                case 0:
                    lobbyForm.removeChild(lobbyForm.wizardDescription);
                    lobbyForm.wizardDescription = lobbyForm.airDescription;
                    lobbyForm.addChild(lobbyForm.wizardDescription);
                    break;
                case 1:
                    lobbyForm.removeChild(lobbyForm.wizardDescription);
                    lobbyForm.wizardDescription = lobbyForm.earthDescription;
                    lobbyForm.addChild(lobbyForm.wizardDescription);
                    break;
                case 2:
                    lobbyForm.removeChild(lobbyForm.wizardDescription);
                    lobbyForm.wizardDescription = lobbyForm.fireDescription;
                    lobbyForm.addChild(lobbyForm.wizardDescription);
                    break;
                case 3:
                    lobbyForm.removeChild(lobbyForm.wizardDescription);
                    lobbyForm.wizardDescription = lobbyForm.waterDescription;
                    lobbyForm.addChild(lobbyForm.wizardDescription);
                    break;
            }
        });

        lobbyForm.airDescription = await DescriptionBox.Create(WizardDescriptions.Air);
        lobbyForm.airDescription.position.set(
            lobbyForm.magicType.x + lobbyForm.magicType.width + 10,
            lobbyForm.wizardName.y + lobbyForm.wizardName.height + 10
        );

        lobbyForm.earthDescription = await DescriptionBox.Create(WizardDescriptions.Earth);
        lobbyForm.earthDescription.position.set(
            lobbyForm.magicType.x + lobbyForm.magicType.width + 10,
            lobbyForm.wizardName.y + lobbyForm.wizardName.height + 10
        );

        lobbyForm.fireDescription = await DescriptionBox.Create(WizardDescriptions.Fire);
        lobbyForm.fireDescription.position.set(
            lobbyForm.magicType.x + lobbyForm.magicType.width + 10,
            lobbyForm.wizardName.y + lobbyForm.wizardName.height + 10
        );

        lobbyForm.waterDescription = await DescriptionBox.Create(WizardDescriptions.Water);
        lobbyForm.waterDescription.position.set(
            lobbyForm.magicType.x + lobbyForm.magicType.width + 10,
            lobbyForm.wizardName.y + lobbyForm.wizardName.height + 10
        );

        lobbyForm.wizardDescription = lobbyForm.airDescription;
        lobbyForm.addChild(lobbyForm.wizardDescription);

        return lobbyForm;
    }
}

class DescriptionBox extends Container {
    public text: HTMLText;
    public border: Graphics;

    public static async Create(text: string): Promise<DescriptionBox> {
        var description = new DescriptionBox();

        description.border = new Graphics();
        description.addChild(description.border);
        description.border.rect(0, 0, 350, 230);
        description.border.stroke({width: 0, color: 0x000000 });

        description.text = new HTMLText({
            text: text,
            style: {
                fontFamily: AssetStore.MonocraftFont.alias,
                fontSize: 100,
                wordWrap: true,
                wordWrapWidth: 2700
            }
        });
        description.addChild(description.text);
        ScaleContainer(description.text, description.border, 0.9);


        return description;
    }
}