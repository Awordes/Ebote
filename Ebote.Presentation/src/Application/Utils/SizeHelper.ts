import { Container } from "pixi.js";

export function ScaleAndCenter(source: Container, dest: HTMLCanvasElement | Container, factor?: number) {
    var scaleX = dest.width / source.width;
    var scaleY = dest.height / source.height;

    var result = scaleX < 1 && scaleY < 1 ? Math.max(scaleX, scaleY) : Math.min(scaleX, scaleY);

    source.scale.set(result * (factor ? factor : 1));
    source.position.set((dest.width - source.width) / 2, (dest.height - source.height) / 2);
}