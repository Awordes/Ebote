import { Container } from "pixi.js";

export function ScaleAndCenterToContainer(source: Container, dest: HTMLCanvasElement | Container, factor?: number) {
    ScaleToContainer(source, dest, factor);
    CenterPosition(source, dest);
}

export function ScaleToContainer(source: Container, dest: HTMLCanvasElement | Container, factor?: number) {
    source.scale.set(Math.min(source.scale.x, source.scale.y) * GetScaleToContainer(source, dest, factor));
}

export function CenterPosition(source: Container, dest: HTMLCanvasElement | Container) {
    source.position.set((dest.width - source.width) / 2, (dest.height - source.height) / 2);
}

export function GetScaleToContainer(source: Container, dest: HTMLCanvasElement | Container, factor?: number): number {
    let scaleX = dest.width / source.width;
    let scaleY = dest.height / source.height;

    return Math.min(scaleX, scaleY) * (factor ? factor : 1);
}