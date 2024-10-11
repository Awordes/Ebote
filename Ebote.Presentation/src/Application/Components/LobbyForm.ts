import { FancyButton, RadioGroup } from "@pixi/ui";
import { Container, Graphics, HTMLText } from "pixi.js";
import { CreateButton } from "./CreateButton";
import { TextService } from "../Localization/TextService";
import { SideType } from "../../client";
import { CreateWizardSelector } from "./CreateWizardSelector";
import { WizardDescriptions } from "../Utils/WizardDescriptions";
import { AssetStore } from "../Utils/AssetStore";
import { ScaleToContainer } from "../Utils/SizeHelper";
import { InputField } from "./InputField";

export class LobbyForm extends Container {
    public backButton: FancyButton;
    public magicType: RadioGroup;
    public sideType: SideType;
    public description: HTMLText;

    public static async Create(): Promise<LobbyForm> {
        let lobbyForm = new LobbyForm();

        lobbyForm.backButton = await CreateButton(TextService.GetStringValue('back'));

        let wizardName = await InputField.Create(TextService.GetStringValue('enterName'));
        wizardName.position.set(lobbyForm.backButton.width + 1, 0);

        lobbyForm.magicType = await CreateWizardSelector();
        lobbyForm.magicType.position.set(0, lobbyForm.backButton.height + 5);
        lobbyForm.magicType.onChange.connect((id: number) => {lobbyForm.ShowDescription(id)});        

        let border = new Graphics();
        border.rect(0, 0, 200, 120);
        border.fill(0x000000);
        
        lobbyForm.description = new HTMLText({
            text: WizardDescriptions.Air,
            style: {
                fontFamily: AssetStore.MonocraftFont.alias,
                fontSize: 100,
                wordWrap: true,
                wordWrapWidth: 2700
            }
        });

        lobbyForm.description.position.set(
            lobbyForm.magicType.width + 1,
            lobbyForm.magicType.y
        );

        ScaleToContainer(lobbyForm.description, border);
        
        lobbyForm.addChild(lobbyForm.description);
        lobbyForm.addChild(lobbyForm.backButton);
        lobbyForm.addChild(lobbyForm.magicType);
        lobbyForm.addChild(wizardName);

        return lobbyForm;
    }

    private ShowDescription(magicType: number) {

        switch (magicType) {
            case 0:
                this.description.text = WizardDescriptions.Air;
                break;
            case 1:
                this.description.text = WizardDescriptions.Earth;
                break;
            case 2:
                this.description.text = WizardDescriptions.Fire;
                break;
            case 3:
                this.description.text = WizardDescriptions.Water;
                break;
        }
    }
}