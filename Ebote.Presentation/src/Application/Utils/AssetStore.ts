import { UnresolvedAsset } from "pixi.js";

export class AssetStore {
    [key: string]: UnresolvedAsset;

    public static readonly menuScroll: UnresolvedAsset = { alias: 'menuScroll', src: 'assets/svg/menu-scroll.svg', data: { parseAsGraphicsContext: true, }, };

    public static readonly buttonDefault: UnresolvedAsset = { alias: 'buttonDefault', src: 'assets/svg/button-default.svg', data: { parseAsGraphicsContext: true, }, };

    public static readonly buttonPressed: UnresolvedAsset = { alias: 'buttonPressed', src: 'assets/svg/button-pressed.svg', data: { parseAsGraphicsContext: true, }, };

    public static readonly buttonHover: UnresolvedAsset = { alias: 'buttonHover', src: 'assets/svg/button-hover.svg', data: { parseAsGraphicsContext: true, }, };

    public static readonly input: UnresolvedAsset = { alias: 'input', src: 'assets/svg/input.svg', data: { parseAsGraphicsContext: true, }, };

    public static readonly gameName: UnresolvedAsset = { alias: 'gameName', src: 'assets/svg/game-name.svg', data: { parseAsGraphicsContext: true, }, };

    public static readonly MonocraftFont: UnresolvedAsset = { alias: 'Monocraft', src: 'assets/fonts/Monocraft.otf' };

    public static readonly rectButtonDeafult: UnresolvedAsset = { alias: 'rectButtonDeafult', src: 'assets/svg/rect-button-default.svg', data: { parseAsGraphicsContext: true, }, };

    public static readonly rectButtonPressed: UnresolvedAsset = { alias: 'rectButtonPressed', src: 'assets/svg/rect-button-pressed.svg', data: { parseAsGraphicsContext: true, }, };

    public static readonly wizardAir: UnresolvedAsset = { alias: 'wizardAir', src: 'assets/svg/wizard-air.svg', data: { parseAsGraphicsContext: true, }, };

    public static readonly wizardEarth: UnresolvedAsset = { alias: 'wizardEarth', src: 'assets/svg/wizard-earth.svg', data: { parseAsGraphicsContext: true, }, };

    public static readonly wizardFire: UnresolvedAsset = { alias: 'wizardFire', src: 'assets/svg/wizard-fire.svg', data: { parseAsGraphicsContext: true, }, };

    public static readonly wizardWater: UnresolvedAsset = { alias: 'wizardWater', src: 'assets/svg/wizard-water.svg', data: { parseAsGraphicsContext: true, }, };
}