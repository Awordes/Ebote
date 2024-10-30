import { CheckBox, RadioGroup } from "@pixi/ui";
import { CreateWizardButton } from "./WizardButton";
import { AssetStore } from "../../Utils/AssetStore";

export async function CreateWizardTypeSelector(): Promise<RadioGroup> {
    var wizards = [];

    wizards.push(
        new CheckBox({
            style: {
                unchecked: await CreateWizardButton(AssetStore.rectButtonDeafult, AssetStore.wizardAir),
                checked: await CreateWizardButton(AssetStore.rectButtonPressed, AssetStore.wizardAir),
            }
        })
    );
    
    wizards.push(
        new CheckBox({
            style: {
                unchecked: await CreateWizardButton(AssetStore.rectButtonDeafult, AssetStore.wizardEarth),
                checked: await CreateWizardButton(AssetStore.rectButtonPressed, AssetStore.wizardEarth),
            }
        })
    );

    wizards.push(
        new CheckBox({
            style: {
                unchecked: await CreateWizardButton(AssetStore.rectButtonDeafult, AssetStore.wizardFire),
                checked: await CreateWizardButton(AssetStore.rectButtonPressed, AssetStore.wizardFire),
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