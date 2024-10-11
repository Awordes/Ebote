import { CheckBox, RadioGroup } from "@pixi/ui";
import { AssetStore } from "../Utils/AssetStore";
import { CreateSideTypeButton } from "./CreateSideButton";

export async function CreateSideTypeSelector(): Promise<RadioGroup> {
    var sides = [];

    sides.push(
        new CheckBox({
            style: {
                unchecked: await CreateSideTypeButton('green', AssetStore.smallButtonDeafult),
                checked: await CreateSideTypeButton('green', AssetStore.smallButtonPressed),
            }
        })
    );

    sides.push(
        new CheckBox({
            style: {
                unchecked: await CreateSideTypeButton('red', AssetStore.smallButtonDeafult),
                checked: await CreateSideTypeButton('red', AssetStore.smallButtonPressed),
            }
        })
    );

    let empty = new CheckBox({
        style: {
            unchecked: await CreateSideTypeButton('red', AssetStore.smallButtonDeafult),
            checked: await CreateSideTypeButton('red', AssetStore.smallButtonPressed),
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