import { Assets, Container, Graphics, HTMLText, Ticker, UnresolvedAsset } from "pixi.js";
import { MagicType, Wizard } from "../../API";
import { AssetStore } from "../../Utils/AssetStore";
import { CenterPosition, GetScaleToValue, ScaleToContainer } from "../../Utils/SizeHelper";
import { ScreenLoader } from "../ScreenLoader";
import { ProgressBar } from "@pixi/ui";

export class WizardView extends Container {
    public spriteFrame1: Graphics;
    public spriteFrame2: Graphics;
    public spriteFrame3: Graphics;
    public spriteFrame4: Graphics;
    private wizardName: HTMLText;
    private hitPointBar: ProgressBar;
    private animationEventHandler = this.AnimationEvent.bind(this);
    private animationTick = 0;
    private activeFrame = 1 | 2 | 3 | 4 | 5 | 6;
    private secondFrameTimeMS = 200;
    private spriteContainer: Container;
    
    public static async Create(wizard: Wizard): Promise<WizardView> {
        let wizardView = new WizardView();

        await InitWizardSprite(wizardView, wizard.magicType);
        
        wizardView.spriteContainer = new Container();
        wizardView.spriteContainer.addChild(wizardView.spriteFrame1);
        wizardView.spriteContainer.addChild(wizardView.spriteFrame2);
        wizardView.spriteContainer.addChild(wizardView.spriteFrame3);
        wizardView.spriteContainer.addChild(wizardView.spriteFrame4);
        wizardView.spriteContainer.x -= wizardView.spriteContainer.width * 0.3;
        
        wizardView.hitPointBar = CreateHitPointBar();
        wizardView.hitPointBar.pivot.set(wizardView.hitPointBar.width / 2, wizardView.hitPointBar.height);
        wizardView.hitPointBar.position.x = wizardView.spriteContainer.width * 0.3;

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

        wizardView.activeFrame = 1;
        ScreenLoader.app.ticker.add(wizardView.animationEventHandler);

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

async function InitWizardSprite(wizardView: WizardView, magicType: MagicType) {
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

    wizardView.spriteFrame1 = new Graphics(await Assets.load(asset1));

    wizardView.spriteFrame1.scale.set(GetScaleToValue(wizardView.spriteFrame1.height, ScreenLoader.constants.wizardHeight));

    wizardView.spriteFrame2 = new Graphics(await Assets.load(asset2));
    ScaleToContainer(wizardView.spriteFrame2, wizardView.spriteFrame1);
    wizardView.spriteFrame2.visible = false;

    wizardView.spriteFrame3 = new Graphics(await Assets.load(asset3));
    ScaleToContainer(wizardView.spriteFrame3, wizardView.spriteFrame1);
    wizardView.spriteFrame3.visible = false;

    wizardView.spriteFrame4 = new Graphics(await Assets.load(asset4));
    ScaleToContainer(wizardView.spriteFrame4, wizardView.spriteFrame1);
    wizardView.spriteFrame4.visible = false;
}

function CreateHitPointBar(): ProgressBar {
    let hpRed = new Graphics();
    hpRed.rect(0, 0, ScreenLoader.constants.wizardWidth, 5);
    hpRed.fill({color: 0xff0000});
    
    let hpGreen = new Graphics();
    hpGreen.rect(0, 0, ScreenLoader.constants.wizardWidth, 5);
    hpGreen.fill({color: 0x00ff00});

    let hpBar = new ProgressBar({
        bg: hpRed,
        fill: hpGreen,
        progress: 80
    });

    return hpBar;
}