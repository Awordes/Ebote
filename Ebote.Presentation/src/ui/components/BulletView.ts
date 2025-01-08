import { Container, Graphics } from "pixi.js";
import { ScreenLoader } from "../ScreenLoader";
import { Bullet } from "../../API";

export async function CreateBulletView(bullet: Bullet): Promise<BulletView> {
    let bulletView = new BulletView();
    let graphic = new Graphics();
    graphic.rect(0, 0, ScreenLoader.constants.bulletWidth, ScreenLoader.constants.bulletHeight);

    switch (bullet.magicType)
    {
        case 0:
            graphic.fill({ color: 0xFFFFFF });
            break;
        case 1:
            graphic.fill({ color: 0x00FF00 });
            break;
        case 2:
            graphic.fill({ color: 0xFF0000 });
            break;
        case 3: 
            graphic.fill({ color: 0x0000FF });
            break;
    }

    bulletView.addChild(graphic);
    return bulletView;
}

export class BulletView extends Container {
    public async UpdateBullet(bullet: Bullet) {
        this.x = bullet.position.x;
        this.y = bullet.position.y;
    }
}