import { Container, ObservablePoint } from "pixi.js";

export class SizeHelper {

    public static CenterPivot(source: Container): ObservablePoint {
        source.pivot.set(source.x + source.width / 2, source.y + source.height / 2);

        return source.pivot;
    }
    
    public static GetScaleFromContainers(source: Container, dest: Container, factor: number): number {
        return this.GetScaleFromValues(source.width, source.height, dest.width, dest.height, factor);
    }

    public static GetScaleFromValues(sourceWidth: number,
            sourceHeight: number, destWidth: number, destHeight: number, factor?: number): number {

        var scaleX = destWidth / sourceWidth;
        var scaleY = destHeight / sourceHeight;

        var result = scaleX < 1 && scaleY < 1
            ? Math.max(scaleX, scaleY)
            : Math.min(scaleX, scaleY);

        if (!factor) factor = 1;

        return result * factor;
    }
}