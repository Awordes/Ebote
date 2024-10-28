import { FancyButton, RadioGroup } from "@pixi/ui";
import { Container, Graphics, HTMLText } from "pixi.js";
import { TextService } from "../../Localization/TextService";
import { AssetStore } from "../../Utils/AssetStore";
import { ScaleToContainer } from "../../Utils/SizeHelper";
import { WizardDescriptions } from "../../Utils/WizardDescriptions";
import { InputField } from "../Components/InputField";
import { CreateButton } from "../Components/Button";
import { CreateSideTypeSelector } from "../Components/SideTypeSelector";
import { CreateWizardTypeSelector } from "../Components/WizardTypeSelector";

export class LobbyForm extends Container {
    public backButton: FancyButton;
    public magicType: RadioGroup;
    public description: HTMLText;
    public sideType: RadioGroup;
    public wizardName: InputField;
    public startGameButton: FancyButton;
    public addWizardButton: FancyButton;
    public id: string;

    public static async Create(lobbyId?: string): Promise<LobbyForm> {
        let lobbyForm = new LobbyForm();
        lobbyForm.id = lobbyId;

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
                fontFamily: AssetStore.monocraftFont.alias,
                fontSize: 100,
                wordWrap: true,
                wordWrapWidth: 2700
            }
        });
        ScaleToContainer(sideDescription, sideDescriptionBorder);
        sideDescription.position.set(lobbyForm.wizardName.x + lobbyForm.wizardName.width + 1, 0);

        lobbyForm.sideType = await CreateSideTypeSelector();
        lobbyForm.sideType.position.set(sideDescription.x + sideDescription.width + 1, 0);

        lobbyForm.magicType = await CreateWizardTypeSelector();
        lobbyForm.magicType.position.set(0, lobbyForm.backButton.height + 5);
        lobbyForm.magicType.onChange.connect((id: number) => {lobbyForm.ShowDescription(id)});

        lobbyForm.addWizardButton = await CreateButton(TextService.GetStringValue('addWizard'));

        lobbyForm.addWizardButton.position.set(
            0,
            lobbyForm.magicType.y + lobbyForm.magicType.height + 1
        );

        lobbyForm.startGameButton = await CreateButton(TextService.GetStringValue('startGame'));
        lobbyForm.startGameButton.enabled = false;

        lobbyForm.startGameButton.position.set(
            lobbyForm.addWizardButton.x + lobbyForm.addWizardButton.width + 1,
            lobbyForm.addWizardButton.y
        );

        let lobbyUrlDescription = new HTMLText({
            text: TextService.GetStringValue('lobbyUrl'),
            style: {
                fontFamily: AssetStore.monocraftFont.alias,
                fontSize: 100,
                wordWrap: true,
                wordWrapWidth: 2700
            }
        });
        lobbyUrlDescription.position.set(
            lobbyForm.startGameButton.x + lobbyForm.startGameButton.width + 5,
            lobbyForm.startGameButton.y
        );

        let lobbyUrlDescBorder = new Graphics();
        lobbyUrlDescBorder.rect(0, 0, 160, lobbyForm.startGameButton.height + 5);
        lobbyUrlDescBorder.fill(0x000000);
        ScaleToContainer(lobbyUrlDescription, lobbyUrlDescBorder);

        let descriptionBorder = new Graphics();
        descriptionBorder.rect(0, 0, lobbyUrlDescription.x + lobbyUrlDescription.width, lobbyForm.magicType.height);
        descriptionBorder.fill(0x000000);
        
        lobbyForm.description = new HTMLText({
            text: WizardDescriptions.Air,
            style: {
                fontFamily: AssetStore.monocraftFont.alias,
                fontSize: 100,
                wordWrap: true,
                wordWrapWidth: 2700
            }
        });

        lobbyForm.description.position.set(
            lobbyForm.magicType.width + 1,
            lobbyForm.magicType.y
        );

        ScaleToContainer(lobbyForm.description, descriptionBorder);

        lobbyForm.addChild(lobbyForm.description);
        lobbyForm.addChild(lobbyForm.backButton);
        lobbyForm.addChild(lobbyForm.magicType);
        lobbyForm.addChild(lobbyForm.sideType);
        lobbyForm.addChild(lobbyForm.addWizardButton);
        lobbyForm.addChild(lobbyForm.startGameButton);
        lobbyForm.addChild(sideDescription);
        lobbyForm.addChild(lobbyUrlDescription);
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