export class AssetStore {
    [key: string]: any;

    public static readonly menuScroll = { alias: 'menuScroll', src: 'assets/svg/menu-scroll.svg', data: { parseAsGraphicsContext: true, }, };

    public static readonly wizard = { alias: 'wizard', src: 'assets/svg/wizard.svg', data: { parseAsGraphicsContext: true, }, };

    public static readonly buttonDefault = { alias: 'buttonDefault', src: 'assets/svg/button-default.svg', data: { parseAsGraphicsContext: true, }, };

    public static readonly buttonPressed = { alias: 'buttonPressed', src: 'assets/svg/button-pressed.svg', data: { parseAsGraphicsContext: true, }, };
    
    public static readonly input = { alias: 'input', src: 'assets/svg/input.svg', data: { parseAsGraphicsContext: true, }, };

    public static readonly gameName = { alias: 'gameName', src: 'assets/svg/game-name.svg', data: { parseAsGraphicsContext: true, }, };

    public static readonly MonocraftFont = { alias: 'Monocraft', src: 'assets/fonts/Monocraft.otf'};
}