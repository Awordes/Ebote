import { Container, ObservablePoint } from "pixi.js";

export class SizeHelper {

    public static CenterPivot(source: Container): ObservablePoint {

        source.pivot.set((source.x + source.width) / 2, (source.y + source.height) / 2);

        return source.pivot;
    }

    public static GetScaleFromValues
        (sourceWidth: number, sourceHeight: number, destWidth: number, destHeight: number, factor: number): number {

        var scaleX = sourceWidth < destWidth
            ? destWidth / sourceWidth
            : sourceWidth / destWidth;
    
        var scaleY = sourceHeight < destHeight
            ? destHeight / sourceHeight
            : sourceHeight / destHeight;

        var predicate = scaleX < 1 && scaleY < 1 
            ? scaleX > scaleY
            : scaleX < scaleY;

        return (predicate ? scaleX : scaleY) * factor;
    }
}