import { Assets, Container, Graphics, HTMLText, Ticker, UnresolvedAsset } from "pixi.js";
import { Wizard } from "../../API";
import { AssetStore } from "../../Utils/AssetStore";
import { GetScaleToValue, ScaleToContainer } from "../../Utils/SizeHelper";
import { ScreenLoader } from "../ScreenLoader";

export class WizardView extends Container {
    private spriteFrame1: Graphics;
    private spriteFrame2: Graphics;
    private spriteFrame3: Graphics;
    private spriteFrame4: Graphics;
    private wizardName: HTMLText;
    private hitPoints: HTMLText;
    private animationEventHandler = this.AnimationEvent.bind(this);
    private animationTick = 0;
    private activeFrame = 1 | 2 | 3 | 4 | 5 | 6;
    private secondFrameTimeMS = 200;
    
    public static async Create(wizard: Wizard): Promise<WizardView> {
        let wizardModel = new WizardView();

        let asset1: UnresolvedAsset;
        let asset2: UnresolvedAsset;
        let asset3: UnresolvedAsset;
        let asset4: UnresolvedAsset;

        switch (wizard.magicType)
        {
            case 0:
                asset1 = AssetStore.wizardAirFrame1;
                asset2 = AssetStore.wizardAirFrame2;
                asset3 = AssetStore.wizardAirFrame3;
                asset4 = AssetStore.wizardAirFrame4;
                break;
            case 1:
                asset1 = AssetStore.wizardEarthFrame1;
                asset2 = AssetStore.wizardEarthFrame2;
                asset3 = AssetStore.wizardEarthFrame3;
                asset4 = AssetStore.wizardEarthFrame4;
                break;
            case 2:
                asset1 = AssetStore.wizardFireFrame1;
                asset2 = AssetStore.wizardFireFrame2;
                asset3 = AssetStore.wizardFireFrame3;
                asset4 = AssetStore.wizardFireFrame4;
                break;
            case 3:
                asset1 = AssetStore.wizardWaterFrame1;
                asset2 = AssetStore.wizardWaterFrame2;
                asset3 = AssetStore.wizardWaterFrame3;
                asset4 = AssetStore.wizardWaterFrame4;
                break;
        }

        wizardModel.spriteFrame1 = new Graphics(await Assets.load(asset1));

        wizardModel.spriteFrame1.scale.set(GetScaleToValue(
            wizardModel.spriteFrame1, ScreenLoader.constants.wizardWidth, ScreenLoader.constants.wizardHeight
        ));

        wizardModel.spriteFrame2 = new Graphics(await Assets.load(asset2));
        ScaleToContainer(wizardModel.spriteFrame2, wizardModel.spriteFrame1);

        wizardModel.spriteFrame3 = new Graphics(await Assets.load(asset3));
        ScaleToContainer(wizardModel.spriteFrame3, wizardModel.spriteFrame1);

        wizardModel.spriteFrame4 = new Graphics(await Assets.load(asset4));
        ScaleToContainer(wizardModel.spriteFrame4, wizardModel.spriteFrame1);

        wizardModel.addChild(wizardModel.spriteFrame1);
        wizardModel.addChild(wizardModel.spriteFrame2);
        wizardModel.addChild(wizardModel.spriteFrame3);
        wizardModel.addChild(wizardModel.spriteFrame4);

        wizardModel.pivot.x = wizardModel.width * 0.67;

        wizardModel.activeFrame = 1;
        wizardModel.spriteFrame2.visible = false;
        wizardModel.spriteFrame3.visible = false;
        wizardModel.spriteFrame4.visible = false;
        ScreenLoader.app.ticker.add(wizardModel.animationEventHandler);

        return wizardModel;
    }

    public async UpdateWizard(wizard: Wizard) {
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

    private async AnimationEvent(ticker: Ticker) {
        this.animationTick += ticker.deltaMS;
        if (this.animationTick > this.secondFrameTimeMS) {
            this.animationTick = 0;
            this.spriteFrame1.visible = false;
            this.spriteFrame2.visible = false;
            this.spriteFrame3.visible = false;
            this.spriteFrame4.visible = false;

            switch (this.activeFrame)
            {
                case 1:
                    this.spriteFrame2.visible = true;
                    this.activeFrame = 2;
                    this.secondFrameTimeMS = 100;
                    break;
                case 2:
                    this.spriteFrame3.visible = true;
                    this.activeFrame = 3;
                    this.secondFrameTimeMS = 100;
                    break;
                case 3:
                    this.spriteFrame4.visible = true;
                    this.activeFrame = 4;
                    this.secondFrameTimeMS = 300;
                    break;
                case 4:
                    this.spriteFrame3.visible = true;
                    this.activeFrame = 5;
                    this.secondFrameTimeMS = 100;
                    break;
                case 5:
                    this.spriteFrame2.visible = true;
                    this.activeFrame = 6;
                    this.secondFrameTimeMS = 100;
                    break;
                case 6:
                    this.spriteFrame1.visible = true;
                    this.activeFrame = 1;
                    this.secondFrameTimeMS = 300;
                    break;
            }
        }
    }
}