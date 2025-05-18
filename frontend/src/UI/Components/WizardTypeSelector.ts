import { CheckBox, RadioGroup } from "@pixi/ui";
import { CreateWizardButton } from "./WizardButton";
import { AssetStore } from "../../Utils/AssetStore";

export async function CreateWizardTypeSelector(): Promise<RadioGroup> {
    var wizards = [];

    wizards.push(
        new CheckBox({
            style: {
                unchecked: await CreateWizardButton(AssetStore.rectButtonDeafult, AssetStore.wizardAirFrame1),
                checked: await CreateWizardButton(AssetStore.rectButtonPressed, AssetStore.wizardAirFrame1),
            }
        })
    );
    
    wizards.push(
        new CheckBox({
            style: {
                unchecked: await CreateWizardButton(AssetStore.rectButtonDeafult, AssetStore.wizardEarthFrame1),
                checked: await CreateWizardButton(AssetStore.rectButtonPressed, AssetStore.wizardEarthFrame1),
            }
        })
    );

    wizards.push(
        new CheckBox({
            style: {
                unchecked: await CreateWizardButton(AssetStore.rectButtonDeafult, AssetStore.wizardFireFrame1),
                checked: await CreateWizardButton(AssetStore.rectButtonPressed, AssetStore.wizardFireFrame1),
            }
        })
    );
    
    wizards.push(
        new CheckBox({
            style: {
                unchecked: await CreateWizardButton(AssetStore.rectButtonDeafult, AssetStore.wizardWaterFrame1),
                checked: await CreateWizardButton(AssetStore.rectButtonPressed, AssetStore.wizardWaterFrame1),
            }
        })
    );

    var wizardSelector = new RadioGroup({
        selectedItem: 0,
        items: wizards,
        type: 'vertical',
        elementsMargin: 10,
    });
    

    return wizardSelector;
}