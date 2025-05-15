import { Graphics, Ticker } from "pixi.js";
import { ScreenLoader } from "../UI/ScreenLoader";

export class AnimationSprite {
    public sprite: Graphics;
    public timeMS: number;
}

export class AnimationState {
    public animation: AnimationSprite[];
    public currentFrame: Graphics;
    public currentFrameDuractionMS: number;
    public currentFrameIndex: number;
    public secondFrameTimeMS: number;

    private animationEventHandler = this.AnimationPlayEvent.bind(this);

    public async StartAnimation() {
        ScreenLoader.app.ticker.add(this.animationEventHandler);
    }

    public async StopAnimation() {
        ScreenLoader.app.ticker.remove(this.animationEventHandler);
    }

    public async ChangeAnimation(newAanimation: AnimationSprite[]) {
        if (newAanimation.length > 0) {
            this.currentFrameIndex = 0;
            this.animation = newAanimation;
            this.currentFrame = this.animation[this.currentFrameIndex].sprite;
            this.secondFrameTimeMS = this.animation[this.currentFrameIndex].timeMS;
            this.currentFrameDuractionMS = 0;
        }
    }

    private async AnimationPlayEvent(ticker: Ticker) {
        this.currentFrameDuractionMS += ticker.deltaMS;
        if (this.currentFrameDuractionMS > this.secondFrameTimeMS) {
            this.currentFrame.visible = false;
            this.currentFrameDuractionMS = 0;

            if (this.currentFrameIndex >= this.animation.length - 1)
                this.currentFrameIndex = 0;
            else
                this.currentFrameIndex++;

            let nextFrame = this.animation[this.currentFrameIndex];
            this.currentFrame = nextFrame.sprite;
            this.currentFrame.visible = true;
            this.secondFrameTimeMS = nextFrame.timeMS;
        }
    }
}
