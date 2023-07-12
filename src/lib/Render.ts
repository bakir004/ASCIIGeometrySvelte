import {Point} from "./Point";
import {rotateOnAll3Axes, rotatePointOnAll3Axes, rotatePointY, rotateY} from "./Rotate";
import {Vector} from "./Vector";


function dot(a: Vector, b: Vector) {
    return a.x*b.x + a.y*b.y + a.z*b.z;
}

export function render(angleX: number, angleY: number, angleZ: number, shapeProperties: any): string[][] {
    const lightSourceVector = new Vector(shapeProperties.lightSourceX, shapeProperties.lightSourceY, shapeProperties.lightSourceZ).normalize()
    let distanceOfScreenFromViewer = 200;
    let screenWidthInPixels = 110;
    let screenHeightInPixels = 75;
    const zDistances: number[][] = [];
    const screen: string[][] = [];

    for (let y = 0; y < screenHeightInPixels; y++) {
        zDistances[y] = new Array(screenWidthInPixels).fill(0);
        screen[y] = new Array(screenWidthInPixels).fill(' ');
    }

    for (let alpha = 0; alpha < 2 * Math.PI; alpha += shapeProperties.alphaSpacing) {
        const cosAlpha = Math.cos(alpha);
        const sinAlpha = Math.sin(alpha);
        const current = new Point(shapeProperties.donutRadius + shapeProperties.donutThicknessRadius * cosAlpha, shapeProperties.donutThicknessRadius * sinAlpha, 0);

        for (let beta = 0; beta < 2 * Math.PI; beta += shapeProperties.betaSpacing) {
            let finalPoint = rotatePointOnAll3Axes(current, angleX, beta, angleZ)
            finalPoint = rotatePointY(finalPoint, angleY).add(new Point(0, 0, shapeProperties.distanceOfDonutFromViewer));
            const ooz = 1 / finalPoint.z;

            const projectedX = Math.floor(screenWidthInPixels / 2 + finalPoint.x * distanceOfScreenFromViewer * ooz);
            const projectedY = Math.floor(screenHeightInPixels / 2 - finalPoint.y * distanceOfScreenFromViewer * ooz);

            if(projectedX < 0 || projectedX >= screenWidthInPixels || isNaN(projectedX)) continue;
            if(projectedY < 0 || projectedY >= screenHeightInPixels || isNaN(projectedY)) continue;

            let luminanceVector = rotateOnAll3Axes(new Vector(cosAlpha, sinAlpha, 0), angleX, beta, angleZ);
            luminanceVector = rotateY(luminanceVector, angleY);
            const luminanceProduct = dot(luminanceVector, lightSourceVector);

            if (luminanceProduct > 0) {
                if (ooz > zDistances[projectedY][projectedX]) {
                    let luminanceIndex = Math.floor(luminanceProduct * 12);
                    if (luminanceIndex === 12) luminanceIndex = 11;

                    zDistances[projectedY][projectedX] = ooz;
                    screen[projectedY][projectedX] = ".,-~:;=!*#$@"[luminanceIndex];
                }
            }
        }
    }
    return screen;
}