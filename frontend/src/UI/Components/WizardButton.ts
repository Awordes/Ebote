import { Assets, Container, Graphics, UnresolvedAsset } from "pixi.js";
import { ScaleAndCenterToContainer } from "../../Utils/SizeHelper";

export async function CreateWizardButton(backgroundAsset: UnresolvedAsset, wizardAsset: UnresolvedAsset): Promise<Container> {
    var button = new Container();

    var background = new Graphics(await Assets.load(backgroundAsset));
    button.addChild(background);

    var wizard = new Graphics(await Assets.load(wizardAsset));
    button.addChild(wizard);

    ScaleAndCenterToContainer(wizard, background, 0.7);

    return button;
}