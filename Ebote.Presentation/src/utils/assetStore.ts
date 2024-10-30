import { UnresolvedAsset } from "pixi.js";

export class AssetStore {
    [key: string]: UnresolvedAsset;

    public static readonly menuScroll: UnresolvedAsset = {
        alias: 'menuScroll',
        src: 'public/sprites/menu-scroll.svg',
        data: { parseAsGraphicsContext: true, }
    };

    public static readonly buttonDefault: UnresolvedAsset = {
        alias: 'buttonDefault',
        src: 'public/sprites/button-default.svg',
        data: { parseAsGraphicsContext: true, }
    };

    public static readonly buttonPressed: UnresolvedAsset = {
        alias: 'buttonPressed',
        src: 'public/sprites/button-pressed.svg',
        data: { parseAsGraphicsContext: true, }
    };

    public static readonly buttonHover: UnresolvedAsset = {
        alias: 'buttonHover',
        src: 'public/sprites/button-hover.svg',
        data: { parseAsGraphicsContext: true, }
    };

    public static readonly buttonDisabled: UnresolvedAsset = {
        alias: 'buttonDisabled',
        src: 'public/sprites/button-disabled.svg',
        data: { parseAsGraphicsContext: true, }
    };

    public static readonly input: UnresolvedAsset = {
        alias: 'input',
        src: 'public/sprites/input.svg',
        data: { parseAsGraphicsContext: true, }
    };

    public static readonly gameName: UnresolvedAsset = {
        alias: 'gameName',
        src: 'public/sprites/game-name.svg',
        data: { parseAsGraphicsContext: true, }
    };

    public static readonly monocraftFont: UnresolvedAsset = {
        alias: 'Monocraft',
        src: 'public/fonts/Monocraft.otf' };

    public static readonly rectButtonDeafult: UnresolvedAsset = {
        alias: 'rectButtonDeafult',
        src: 'public/sprites/rect-button-default.svg',
        data: { parseAsGraphicsContext: true, }
    };

    public static readonly rectButtonPressed: UnresolvedAsset = {
        alias: 'rectButtonPressed',
        src: 'public/sprites/rect-button-pressed.svg',
        data: { parseAsGraphicsContext: true, }
    };

    public static readonly wizardAir: UnresolvedAsset = {
        alias: 'wizardAir',
        src: 'public/sprites/wizard-air.svg',
        data: { parseAsGraphicsContext: true, }
    };

    public static readonly wizardEarth: UnresolvedAsset = {
        alias: 'wizardEarth',
        src: 'public/sprites/wizard-earth.svg',
        data: { parseAsGraphicsContext: true, }
    };

    public static readonly wizardFire: UnresolvedAsset = {
        alias: 'wizardFire',
        src: 'public/sprites/wizard-fire.svg',
        data: { parseAsGraphicsContext: true, }
    };

    public static readonly wizardWaterFrame1: UnresolvedAsset = {
        alias: 'wizardWaterFrame1',
        src: 'public/sprites/wizard-water-frame1.svg',
        data: { parseAsGraphicsContext: true, }
    };

    public static readonly wizardWaterFrame2: UnresolvedAsset = {
        alias: 'wizardWaterFrame2',
        src: 'public/sprites/wizard-water-frame2.svg',
        data: { parseAsGraphicsContext: true, }
    };

    public static readonly wizardWaterFrame3: UnresolvedAsset = {
        alias: 'wizardWaterFrame3',
        src: 'public/sprites/wizard-water-frame3.svg',
        data: { parseAsGraphicsContext: true, }
    };

    public static readonly smallButtonDeafult: UnresolvedAsset = {
        alias: 'smallButtonDeafult',
        src: 'public/sprites/small-button-default.svg',
        data: { parseAsGraphicsContext: true, }
    };

    public static readonly smallButtonPressed: UnresolvedAsset = {
        alias: 'smallButtonPressed',
        src: 'public/sprites/small-button-pressed.svg',
        data: { parseAsGraphicsContext: true, }
    };

    public static readonly modalBackground: UnresolvedAsset = {
        alias: 'modalBackground',
        src: 'public/sprites/modal-background.svg',
        data: { parseAsGraphicsContext: true, }
    };
}