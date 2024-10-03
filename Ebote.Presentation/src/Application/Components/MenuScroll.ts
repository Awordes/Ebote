import { Assets, Container, Graphics } from "pixi.js";
import { AssetStore } from "../Utils/AssetStore";

export class MenuScroll {
    public static async Init(): Promise<Container> {
        var menuScroll = new Container();

        menuScroll.addChild(new Graphics(await Assets.load(AssetStore.menuScroll)));

        return menuScroll;
    }
}