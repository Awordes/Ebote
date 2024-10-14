import { FancyButton, RadioGroup } from "@pixi/ui";
import { Container, Graphics, HTMLText } from "pixi.js";
import { CreateButton } from "./CreateButton";
import { TextService } from "../Localization/TextService";
import { CreateWizardSelector } from "./CreateWizardSelector";
import { WizardDescriptions } from "../Utils/WizardDescriptions";
import { AssetStore } from "../Utils/AssetStore";
import { ScaleToContainer } from "../Utils/SizeHelper";
import { InputField } from "./InputField";
import { CreateSideTypeSelector as CreateSideSelector } from "./CreateSideTypeSelector";

export class LobbyForm extends Container {
    public backButton: FancyButton;
    public magicType: RadioGroup;
    public description: HTMLText;
    public sideType: RadioGroup;
    public wizardName: InputField;
    public startGameButton: FancyButton;
    public addWizardButton: FancyButton;

    public static async Create(): Promise<LobbyForm> {
        let lobbyForm = new LobbyForm();

        lobbyForm.backButton = await CreateButton(TextService.GetStringValue('back'));

        lobbyForm.wizardName = await InputField.Create(TextService.GetStringValue('enterName'));
        lobbyForm.wizardName.position.set(lobbyForm.backButton.width + 1, 0);
        
        let sideDescriptionBorder = new Graphics();
        sideDescriptionBorder.rect(
            lobbyForm.wizardName.x + lobbyForm.wizardName.width + 1,
            0,
            lobbyForm.wizardName.width,
            lobbyForm.wizardName.height
        );
        sideDescriptionBorder.fill(0x000000);

        let sideDescription = new HTMLText({
            text: TextService.GetStringValue('team'),
            style: {
                fontFamily: AssetStore.MonocraftFont.alias,
                fontSize: 100,
                wordWrap: true,
                wordWrapWidth: 2700
            }
        });
        ScaleToContainer(sideDescription, sideDescriptionBorder);
        sideDescription.position.set(lobbyForm.wizardName.x + lobbyForm.wizardName.width + 1, 0);

        lobbyForm.sideType = await CreateSideSelector();
        lobbyForm.sideType.position.set(sideDescription.x + sideDescription.width + 1, 0);

        lobbyForm.magicType = await CreateWizardSelector();
        lobbyForm.magicType.position.set(0, lobbyForm.backButton.height + 5);
        lobbyForm.magicType.onChange.connect((id: number) => {lobbyForm.ShowDescription(id)});        

        let border = new Graphics();
        border.rect(0, 0, 200, lobbyForm.magicType.height);
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

        lobbyForm.addWizardButton = await CreateButton(TextService.GetStringValue('addWizard'));

        lobbyForm.addWizardButton.position.set(
            0,
            lobbyForm.magicType.y + lobbyForm.magicType.height + 1
        );

        lobbyForm.startGameButton = await CreateButton(TextService.GetStringValue('startGame'));

        lobbyForm.startGameButton.position.set(
            lobbyForm.addWizardButton.x + lobbyForm.addWizardButton.width + 1,
            lobbyForm.addWizardButton.y
        );

        lobbyForm.addChild(lobbyForm.description);
        lobbyForm.addChild(lobbyForm.backButton);
        lobbyForm.addChild(lobbyForm.magicType);
        lobbyForm.addChild(lobbyForm.sideType);
        lobbyForm.addChild(lobbyForm.addWizardButton);
        lobbyForm.addChild(lobbyForm.startGameButton);
        lobbyForm.addChild(sideDescription);
        lobbyForm.addChild(lobbyForm.wizardName);

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