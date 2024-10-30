import { Assets, Container, Graphics, UnresolvedAsset } from "pixi.js";
import { Wizard } from "../../API";
import { AssetStore } from "../../Utils/AssetStore";
import { GetScaleToValue } from "../../Utils/SizeHelper";
import { ScreenLoader } from "../ScreenLoader";

export class WizardView extends Container {
    private sprite: Graphics;
    
    public static async Create(wizard: Wizard): Promise<WizardView> {
        let wizardModel = new WizardView();

        let asset: UnresolvedAsset;
        switch (wizard.magicType)
        {
            case 0:
                asset = AssetStore.wizardAir;
                break;
            case 1:
                asset = AssetStore.wizardEarth;
                break;
            case 2:
                asset = AssetStore.wizardFire;
                break;
            case 3:
                asset = AssetStore.wizardWater;
                break;
        }

        wizardModel.sprite = new Graphics(await Assets.load(asset));

        wizardModel.sprite.scale.set(
            GetScaleToValue(wizardModel.sprite, ScreenLoader.constants.wizardWidth, ScreenLoader.constants.wizardHeight));

        wizardModel.addChild(wizardModel.sprite);

        return wizardModel;
    }

    public async UpdateWizard(wizard: Wizard) {
        console.log(wizard.position.x + ' ' + wizard.position.y);
        this.x = wizard.position.x;
        this.y = wizard.position.y;

        if (this.scale.x > 0 && wizard.eyeDirection.x < 0) {
            this.Flip();
        } else if (this.scale.x < 0 && wizard.eyeDirection.x > 0) {
            this.Flip();
        }
    }

    private Flip() {
        this.scale.x *= -1;
    }
}