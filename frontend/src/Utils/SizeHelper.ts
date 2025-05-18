import { Container } from "pixi.js";

export function ScaleAndCenterToContainer(source: Container, dest: HTMLCanvasElement | Container, factor?: number) {
    ScaleToContainer(source, dest, factor);
    CenterPosition(source, dest);
}

export function ScaleToContainer(source: Container, dest: HTMLCanvasElement | Container, factor?: number) {
    source.scale.set(Math.min(source.scale.x, source.scale.y) * GetScaleToContainer(source, dest, factor));
}

export function CenterPosition(source: Container, dest: HTMLCanvasElement | Container, scaleType?: 'X' | 'Y') {
    if (scaleType == 'X')
        source.position.x = (dest.width - source.width) / 2;
    else if (scaleType == 'Y')
        source.position.y = (dest.height - source.height) / 2;
    else
        source.position.set((dest.width - source.width) / 2, (dest.height - source.height) / 2);
}

export function GetScaleToContainer(
    source: Container,
    dest: HTMLCanvasElement | Container,
    factor?: number,
    scaleType?: 'X' | 'Y'): number {

    let scaleX = dest.width / source.width;
    let scaleY = dest.height / source.height;

    let scale: number;
    if (scaleType == "X")
        scale = scaleX;
    else if (scaleType == "Y")
        scale = scaleY;
    else
        scale = Math.min(scaleX, scaleY);

    return scale * (factor ? factor : 1);
}

export function GetScaleToValue(source: number, dest: number, factor?: number): number {
    return dest / source * (factor ? factor : 1);
}