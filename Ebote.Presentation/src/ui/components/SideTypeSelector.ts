import { CheckBox, RadioGroup } from "@pixi/ui";
import { CreateSideButton } from "./SideButton";
import { AssetStore } from "../../Utils/AssetStore";

export async function CreateSideTypeSelector(): Promise<RadioGroup> {
    var sides = [];

    sides.push(
        new CheckBox({
            style: {
                unchecked: await CreateSideButton('green', AssetStore.smallButtonDeafult),
                checked: await CreateSideButton('green', AssetStore.smallButtonPressed),
            }
        })
    );

    sides.push(
        new CheckBox({
            style: {
                unchecked: await CreateSideButton('red', AssetStore.smallButtonDeafult),
                checked: await CreateSideButton('red', AssetStore.smallButtonPressed),
            }
        })
    );

    let empty = new CheckBox({
        style: {
            unchecked: await CreateSideButton('red', AssetStore.smallButtonDeafult),
            checked: await CreateSideButton('red', AssetStore.smallButtonPressed),
        }
    })
    empty.visible = false;

    sides.push(empty);

    let sideTypeSelector = new RadioGroup({
        selectedItem: 2,
        items: sides,
        type: 'horizontal',
        elementsMargin: 1,
    });

    return sideTypeSelector;
}