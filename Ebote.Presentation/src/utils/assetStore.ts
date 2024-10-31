import { UnresolvedAsset } from "pixi.js";

export class AssetStore {
    [key: string]: UnresolvedAsset;

    public static readonly menuScroll: UnresolvedAsset = {
        alias: 'menuScroll',
        src: 'public/sprites/menu-scroll.svg',
        data: { parseAsGraphicsContext: true, }
    };

    public static readonly menuScrollShadow: UnresolvedAsset = {
        alias: 'menuScrollShadow',
        src: 'public/sprites/menu-scroll-shadow.svg',
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

    //Water
    public static readonly wizardWaterFrame1: UnresolvedAsset = {
        alias: 'wizardWaterFrame1',
        src: 'public/sprites/wizards/water/idle/frame1.svg',
        data: { parseAsGraphicsContext: true, }
    };

    public static readonly wizardWaterFrame2: UnresolvedAsset = {
        alias: 'wizardWaterFrame2',
        src: 'public/sprites/wizards/water/idle/frame2.svg',
        data: { parseAsGraphicsContext: true, }
    };

    public static readonly wizardWaterFrame3: UnresolvedAsset = {
        alias: 'wizardWaterFrame3',
        src: 'public/sprites/wizards/water/idle/frame3.svg',
        data: { parseAsGraphicsContext: true, }
    };

    public static readonly wizardWaterFrame4: UnresolvedAsset = {
        alias: 'wizardWaterFrame4',
        src: 'public/sprites/wizards/water/idle/frame4.svg',
        data: { parseAsGraphicsContext: true, }
    };
    
    //Air
    public static readonly wizardAirFrame1: UnresolvedAsset = {
        alias: 'wizardAirFrame1',
        src: 'public/sprites/wizards/air/idle/frame1.svg',
        data: { parseAsGraphicsContext: true, }
    };

    public static readonly wizardAirFrame2: UnresolvedAsset = {
        alias: 'wizardAirFrame2',
        src: 'public/sprites/wizards/air/idle/frame2.svg',
        data: { parseAsGraphicsContext: true, }
    };

    public static readonly wizardAirFrame3: UnresolvedAsset = {
        alias: 'wizardAirFrame3',
        src: 'public/sprites/wizards/air/idle/frame3.svg',
        data: { parseAsGraphicsContext: true, }
    };

    public static readonly wizardAirFrame4: UnresolvedAsset = {
        alias: 'wizardAirFrame4',
        src: 'public/sprites/wizards/air/idle/frame4.svg',
        data: { parseAsGraphicsContext: true, }
    };

    //Earth
    public static readonly wizardEarthFrame1: UnresolvedAsset = {
        alias: 'wizardEarthFrame1',
        src: 'public/sprites/wizards/earth/idle/frame1.svg',
        data: { parseAsGraphicsContext: true, }
    };

    public static readonly wizardEarthFrame2: UnresolvedAsset = {
        alias: 'wizardEarthFrame2',
        src: 'public/sprites/wizards/earth/idle/frame2.svg',
        data: { parseAsGraphicsContext: true, }
    };

    public static readonly wizardEarthFrame3: UnresolvedAsset = {
        alias: 'wizardEarthFrame3',
        src: 'public/sprites/wizards/earth/idle/frame3.svg',
        data: { parseAsGraphicsContext: true, }
    };

    public static readonly wizardEarthFrame4: UnresolvedAsset = {
        alias: 'wizardEarthFrame4',
        src: 'public/sprites/wizards/earth/idle/frame4.svg',
        data: { parseAsGraphicsContext: true, }
    };

    //Fire
    public static readonly wizardFireFrame1: UnresolvedAsset = {
        alias: 'wizardFireFrame1',
        src: 'public/sprites/wizards/fire/idle/frame1.svg',
        data: { parseAsGraphicsContext: true, }
    };

    public static readonly wizardFireFrame2: UnresolvedAsset = {
        alias: 'wizardFireFrame2',
        src: 'public/sprites/wizards/fire/idle/frame2.svg',
        data: { parseAsGraphicsContext: true, }
    };

    public static readonly wizardFireFrame3: UnresolvedAsset = {
        alias: 'wizardFireFrame3',
        src: 'public/sprites/wizards/fire/idle/frame3.svg',
        data: { parseAsGraphicsContext: true, }
    };

    public static readonly wizardFireFrame4: UnresolvedAsset = {
        alias: 'wizardFireFrame4',
        src: 'public/sprites/wizards/fire/idle/frame4.svg',
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