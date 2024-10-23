import { HTMLText, HTMLTextOptions } from "pixi.js";
import { MagicType, WizardToAdd } from "../../API";
import { TextService } from "../../Localization/TextService";

export class TeamList extends HTMLText {
    private greenTeam: WizardToAdd[];
    private redTeam: WizardToAdd[];

    constructor(options?: HTMLTextOptions) {
        super(options);

        this.redTeam = [];
        this.greenTeam = [];
    }

    public updateWizardList(wizards: WizardToAdd[]): void {
        let isUpdatedList = false;

        wizards.forEach(wizard => {
            if (wizard.sideType == 0 && !this.greenTeam[wizard.profileId]) {
                isUpdatedList = true;
                this.greenTeam[wizard.profileId] = wizard;
            } else if (wizard.sideType == 1 && !this.redTeam[wizard.profileId]) {
                isUpdatedList = true;
                this.redTeam[wizard.profileId] = wizard;
            }
        });

        if (isUpdatedList || wizards.length == 0)
            this.UpdateText();
    }

    public UpdateText() {
        let resultString = TextService.GetStringValue('wizardsInLobbyy') + '<br><br>';

        for (let key in this.greenTeam) {
            resultString = resultString + '<b style="color: #088F8F;">' + this.getWizardString(this.greenTeam[key]) + '</b><br>';
        }

        resultString = resultString + '<br><br>';

        for (let key in this.redTeam) {
            resultString = resultString + '<b style="color: #EE4B2B;">' + this.getWizardString(this.redTeam[key]) + '</b><br>';
        }

        this.text = resultString;
    }

    private getWizardString(wizard: WizardToAdd): string {
        return '[' + this.getMagicTypeString(wizard.magicType) + '] ' + wizard.name;
    }

    private getMagicTypeString(magicType: MagicType): string {
        switch (magicType) {
            case 0: return 'Air';
            case 1: return 'Earth';
            case 2: return 'Fire';
            case 3: return 'Water';
        }
    }
}