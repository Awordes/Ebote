import { Assets, Container, Graphics, UnresolvedAsset } from "pixi.js";
import { CenterPosition } from "../../Utils/SizeHelper";

export async function CreateSideButton(side: 'green' | 'red', background: UnresolvedAsset): Promise<Container> {
    var button = new Container();

    let defaultbutton = new Graphics(await Assets.load(background));
    button.addChild(defaultbutton);

    let rectangle = new Graphics();
    button.addChild(rectangle);
    rectangle.rect(0, 0, defaultbutton.width / 2, defaultbutton.height / 2);

    if (side == 'green')
        rectangle.fill(0x088F8F);
    else if (side == 'red')
        rectangle.fill(0xEE4B2B);

    CenterPosition(rectangle, button);

    return button;
}