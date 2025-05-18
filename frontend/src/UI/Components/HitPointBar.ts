import { ProgressBar } from "@pixi/ui";
import { Graphics } from "pixi.js";

export function CreateHitPointBar(width: number): ProgressBar {
    let hpRed = new Graphics();
    hpRed.rect(0, 0, width, 5);
    hpRed.fill({color: 0xff0000});

    let hpGreen = new Graphics();
    hpGreen.rect(0, 0, width, 5);
    hpGreen.fill({color: 0x00ff00});

    let hpBar = new ProgressBar({
        bg: hpRed,
        fill: hpGreen,
        progress: 80
    });

    return hpBar;
}