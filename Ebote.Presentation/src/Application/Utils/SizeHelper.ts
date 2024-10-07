import { Container } from "pixi.js";

export function ScaleAndCenter(source: Container, dest: HTMLCanvasElement | Container, factor?: number) {
    var scaleX = dest.width / source.width;
    var scaleY = dest.height / source.height;

    source.scale.set(Math.min(scaleX, scaleY) * (factor ? factor : 1));
    source.position.set((dest.width - source.width) / 2, (dest.height - source.height) / 2);
}

export function ScaleContainer(source: Container, dest: HTMLCanvasElement | Container, factor?: number) {
    var scaleX = dest.width / source.width;
    var scaleY = dest.height / source.height;

    source.scale.set(Math.min(scaleX, scaleY) * (factor ? factor : 1));
}