import { Assets, Container, Graphics, HTMLText, Ticker, TickerCallback } from "pixi.js";
import { AssetStore } from "../../Utils/AssetStore";
import { ScreenLoader } from "../ScreenLoader";
import { ScaleAndCenterToContainer } from "../../Utils/SizeHelper";

export class ModalStore extends Container {
    protected modalLifeTimeInMS: number = 3000;
    protected modalHideTimeInMS: number = 1000;

    public static async Create(): Promise<ModalStore> {
        let modalStore = new ModalStore();

        return modalStore;
    }

    public async ShowModal(text: string): Promise<void> {
        let modal = await Modal.Create(text);

        modal.position.y = (modal.height + 1) * this.children.length;

        modal.ageTicker = (ticker: Ticker) => {
            if (modal.life < this.modalLifeTimeInMS) {
                modal.life = modal.life + ticker.deltaMS;
            } else {
                ScreenLoader.app.ticker.remove(modal.ageTicker);
                modal.life = 0;

                modal.hideTicker = (ticker: Ticker) => {
                    if (modal.life < this.modalHideTimeInMS) {
                        modal.life = modal.life + ticker.deltaMS;
                        modal.alpha = 1 - modal.life / this.modalHideTimeInMS;
                    } else {
                        ScreenLoader.app.ticker.remove(modal.hideTicker);

                        this.removeChild(modal);
                        this.UpdateChildrenPosition();
                    }
                };

                ScreenLoader.app.ticker.add(modal.hideTicker);
            }
        };

        ScreenLoader.app.ticker.add(modal.ageTicker);
        this.addChild(modal);
    }

    public UpdateChildrenPosition() {
        this.children.forEach((element, index) => {
            if (element as Modal) {
                if (index > 0) {
                    element.position.y = index * (element as Modal).background.height;
                } else {
                    element.y = 0;
                }
            }
        });
    }
}

class Modal extends Container {
    public background: Graphics;
    public life: number = 0;
    public ageTicker: TickerCallback<any>;
    public hideTicker: TickerCallback<any>;

    public static async Create(text: string): Promise<Modal> {
        let modal = new Modal();

        modal.background = new Graphics(await Assets.load(AssetStore.modalBackground));

        let message = new HTMLText({
            text: text,
            style: {
                fontFamily: AssetStore.monocraftFont.alias,
                fontSize: 100,
                wordWrap: true, 
                wordWrapWidth: 2700
            }
        });

        ScaleAndCenterToContainer(message, modal.background, 0.9);

        modal.addChild(modal.background);
        modal.addChild(message);

        return modal;
    }
}
