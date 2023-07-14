import {Point} from "./Point";
import {rotateOnAll3Axes, rotatePointOnAll3Axes, rotatePointY, rotateY} from "./Rotate";
import {Vector} from "./Vector";


function dot(a: Vector, b: Vector) {
    return a.x*b.x + a.y*b.y + a.z*b.z;
}

export function render(angleX: number, angleY: number, angleZ: number, shapeProperties: any): string[][] {
    if(shapeProperties.type === 'donut')
        return renderDonut(angleX, angleY, angleZ, shapeProperties)
    else
        return renderCube(angleX, angleY, angleZ, shapeProperties)
}

const renderDonut = (angleX: number, angleY: number, angleZ: number, shapeProperties: any): string[][] => {
    const lightSourceVector = new Vector(shapeProperties.lightSourceX, shapeProperties.lightSourceY, shapeProperties.lightSourceZ).normalize()
    let distanceOfScreenFromViewer = 200;
    const zDistances: number[][] = [];
    const screen: string[][] = [];

    for (let y = 0; y < shapeProperties.screenHeight; y++) {
        zDistances[y] = new Array(shapeProperties.screenWidth).fill(0);
        screen[y] = new Array(shapeProperties.screenWidth).fill(' ');
    }

    for (let alpha = 0; alpha < 2 * Math.PI; alpha += shapeProperties.alphaSpacing) {
        const cosAlpha = Math.cos(alpha);
        const sinAlpha = Math.sin(alpha);
        const current = new Point(shapeProperties.donutRadius + shapeProperties.donutThicknessRadius * cosAlpha, shapeProperties.donutThicknessRadius * sinAlpha, 0);

        for (let beta = 0; beta < 2 * Math.PI; beta += shapeProperties.betaSpacing) {
            let finalPoint = rotatePointOnAll3Axes(current, angleX, beta, angleZ)
            finalPoint = rotatePointY(finalPoint, angleY).add(new Point(0, 0, shapeProperties.distanceOfDonutFromViewer));
            const ooz = 1 / finalPoint.z;

            const projectedX = Math.floor(shapeProperties.screenWidth / 2 + finalPoint.x * distanceOfScreenFromViewer * ooz);
            const projectedY = Math.floor(shapeProperties.screenHeight / 2 - finalPoint.y * distanceOfScreenFromViewer * ooz);

            if(projectedX < 0 || projectedX >= shapeProperties.screenWidth || isNaN(projectedX)) continue;
            if(projectedY < 0 || projectedY >= shapeProperties.screenHeight || isNaN(projectedY)) continue;

            let luminanceVector = rotateOnAll3Axes(new Vector(cosAlpha, sinAlpha, 0), angleX, beta, angleZ);
            luminanceVector = rotateY(luminanceVector, angleY);
            const luminanceProduct = dot(luminanceVector, lightSourceVector)+1;

            // if (luminanceProduct > 0) {
            if (ooz > zDistances[projectedY][projectedX]) {
                let luminanceIndex = Math.floor(luminanceProduct * 5.9);

                zDistances[projectedY][projectedX] = ooz;
                screen[projectedY][projectedX] = ".,-~:;=!*#$@"[luminanceIndex];
            }
            // }
        }
    }
    return screen;
}
const renderCube = (angleX: number, angleY: number, angleZ: number, shapeProperties: any): string[][] => {
    const lightSourceVector = new Vector(shapeProperties.lightSourceX, shapeProperties.lightSourceY, shapeProperties.lightSourceZ).normalize()
    const zDistances: number[][] = [];
    const screen: string[][] = [];
    const cubeRadius = shapeProperties.donutRadius * 2.5
    const spacing = shapeProperties.alphaSpacing * 5

    for (let y = 0; y < shapeProperties.screenHeight; y++) {
        zDistances[y] = new Array(shapeProperties.screenWidth).fill(0);
        screen[y] = new Array(shapeProperties.screenWidth).fill(' ');
    }

    for (let i = -cubeRadius; i < cubeRadius; i += spacing) {
        for (let j = -cubeRadius; j < cubeRadius; j += spacing) {
            let points: Point[] = [];
            points.push(new Point(i, j, -cubeRadius))
            points.push(new Point(i, j, cubeRadius))
            points.push(new Point(-cubeRadius, i, j))
            points.push(new Point(cubeRadius, i, j))
            points.push(new Point(i, -cubeRadius, j))
            points.push(new Point(i, cubeRadius, j))
            let luminances: Vector[] = [
                new Vector(0,0,-1),
                new Vector(0,0,1),
                new Vector(-1,0,0),
                new Vector(1,0,0),
                new Vector(0,-1,0),
                new Vector(0,1,0),
            ];

            for(let k = 0; k < 6; k++) {
                let current = points[k]
                let finalPoint = rotatePointOnAll3Axes(current, angleX, angleY, angleZ).add(new Point(0, 0, shapeProperties.distanceOfDonutFromViewer));
                const ooz = 1 / finalPoint.z;

                const projectedX = Math.floor(shapeProperties.screenWidth / 2 + finalPoint.x);
                const projectedY = Math.floor(shapeProperties.screenHeight / 2 - finalPoint.y);

                if(projectedX < 0 || projectedX >= shapeProperties.screenWidth || isNaN(projectedX)) continue;
                if(projectedY < 0 || projectedY >= shapeProperties.screenHeight || isNaN(projectedY)) continue;

                let luminanceVector = rotateOnAll3Axes(luminances[k], angleX, angleY, angleZ);
                const luminanceProduct = dot(luminanceVector, lightSourceVector)+1;

                // if (luminanceProduct > 0) {
                    if (ooz > zDistances[projectedY][projectedX]) {
                        let luminanceIndex = Math.floor(luminanceProduct * 5.9);

                        zDistances[projectedY][projectedX] = ooz;
                        screen[projectedY][projectedX] = ".,-~:;=!*#$@"[luminanceIndex];
                    }
                // }
            }
        }
    }
    return screen;
}