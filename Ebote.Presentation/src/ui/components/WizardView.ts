import { Assets, Container, Graphics, HTMLText, Ticker, UnresolvedAsset } from "pixi.js";
import { MagicType, Wizard, WizardState } from "../../API";
import { AssetStore } from "../../Utils/AssetStore";
import { CenterPosition, GetScaleToValue, ScaleToContainer } from "../../Utils/SizeHelper";
import { ScreenLoader } from "../ScreenLoader";
import { ProgressBar } from "@pixi/ui";
import { AnimationSprite, AnimationState } from "../../Utils/Animation";
import { CreateHitPointBar } from "./HitPointBar";

export class WizardView extends Container {
    private spriteContainer: Container;

    private wizardName: HTMLText;
    private hitPointBar: ProgressBar;

    private wizardState: WizardState;

    private animationState: AnimationState;
    private idleAnimation: AnimationSprite[];
    
    public static async Create(wizard: Wizard): Promise<WizardView> {
        let wizardView = new WizardView();

        wizardView.spriteContainer = new Container();
        wizardView.spriteContainer.x -= wizardView.spriteContainer.width * 0.3;

        await wizardView.InitWizardIdleAnimation(wizard.magicType);
        wizardView.animationState = new AnimationState();
        await wizardView.animationState.ChangeAnimation(wizardView.idleAnimation);
        await wizardView.animationState.StartAnimation();

        wizardView.hitPointBar = CreateHitPointBar(ScreenLoader.constants.wizardWidth * 2);
        wizardView.hitPointBar.pivot.set(wizardView.hitPointBar.width / 2, wizardView.hitPointBar.height);
        wizardView.hitPointBar.position.x = wizardView.spriteContainer.width / 2 * 1.3;

        let wizardNameBorder = new Graphics();
        wizardNameBorder.rect(0, 0, ScreenLoader.constants.wizardWidth * 3, wizardView.hitPointBar.height * 5);
        wizardNameBorder.fill({ color: 0x0 });

        wizardView.wizardName = new HTMLText({
            text: wizard.name,
            style: {
                fontFamily: AssetStore.monocraftFont.alias,
                fontSize: 100,
                wordWrap: true,
                wordWrapWidth: 2700
            }
        });
        ScaleToContainer(wizardView.wizardName, wizardNameBorder);
        wizardView.wizardName.position.y -= wizardView.wizardName.height + wizardView.hitPointBar.height;
        CenterPosition(wizardView.wizardName, wizardView.hitPointBar, 'X');

        wizardView.addChild(wizardView.spriteContainer);
        wizardView.addChild(wizardView.hitPointBar);
        wizardView.addChild(wizardView.wizardName);

        return wizardView;
    }

    public async UpdateWizard(wizard: Wizard) {
        this.x = wizard.position.x;
        this.y = wizard.position.y;

        if (this.spriteContainer.scale.x > 0 && wizard.eyeDirection.x < 0) {
            this.spriteContainer.scale.x *= -1;
            this.spriteContainer.x += this.spriteContainer.width * 1.3;
        } else if (this.spriteContainer.scale.x < 0 && wizard.eyeDirection.x > 0) {
            this.spriteContainer.scale.x *= -1;
            this.spriteContainer.x -= this.spriteContainer.width * 1.3;
        }

        this.hitPointBar.progress = wizard.currentHitPoints / wizard.maxHitPoints * 100;
        this.wizardState = wizard.state;
    }

    private async InitWizardIdleAnimation(magicType: MagicType) {
        let asset1: UnresolvedAsset;
        let asset2: UnresolvedAsset;
        let asset3: UnresolvedAsset;
        let asset4: UnresolvedAsset;

        switch (magicType)
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

        let spriteFrame1 = new Graphics(await Assets.load(asset1));
        this.spriteContainer.addChild(spriteFrame1);

        spriteFrame1.scale.set(GetScaleToValue(spriteFrame1.height, ScreenLoader.constants.wizardHeight));

        let spriteFrame2 = new Graphics(await Assets.load(asset2));
        this.spriteContainer.addChild(spriteFrame2);
        ScaleToContainer(spriteFrame2, spriteFrame1);
        spriteFrame2.visible = false;

        let spriteFrame3 = new Graphics(await Assets.load(asset3));
        this.spriteContainer.addChild(spriteFrame3);
        ScaleToContainer(spriteFrame3, spriteFrame1);
        spriteFrame3.visible = false;

        let spriteFrame4 = new Graphics(await Assets.load(asset4));
        this.spriteContainer.addChild(spriteFrame4);
        ScaleToContainer(spriteFrame4, spriteFrame1);
        spriteFrame4.visible = false;

        this.idleAnimation = [
            { sprite: spriteFrame1, timeMS: 300 },
            { sprite: spriteFrame2, timeMS: 100 },
            { sprite: spriteFrame3, timeMS: 100 },
            { sprite: spriteFrame4, timeMS: 300 },
            { sprite: spriteFrame3, timeMS: 100 },
            { sprite: spriteFrame2, timeMS: 100 },
        ];
    }
}
