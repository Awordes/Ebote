import { Assets, Container, Graphics, UnresolvedAsset } from "pixi.js";
import { getLobbyConstants, Wizard } from "../../API";
import { AssetStore } from "../../Utils/AssetStore";
import { GetScaleToValue } from "../../Utils/SizeHelper";

export class WizardModel extends Container {
    
    public static async Create(wizard: Wizard): Promise<WizardModel> {
        let wizardModel = new WizardModel();

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

        let sprite = new Graphics(await Assets.load(asset));

        let gameConstants = await getLobbyConstants();

        sprite.scale.set(GetScaleToValue(sprite, gameConstants.data.wizardWidth, gameConstants.data.wizardHeight));

        wizardModel.addChild(sprite);

        return wizardModel;
    }
}