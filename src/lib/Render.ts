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

const renderDonut = (A: number, B: number, C: number, shapeProperties: any): string[][] => {
    const lightSourceVector = new Vector(shapeProperties.lightSourceX, shapeProperties.lightSourceY, shapeProperties.lightSourceZ).normalize()
    let distanceOfScreenFromViewer = 200;
    const zDistances: number[][] = [];
    const screen: string[][] = [];

    for (let y = 0; y < shapeProperties.screenHeight; y++) {
        zDistances[y] = new Array(shapeProperties.screenWidth).fill(0);
        screen[y] = new Array(shapeProperties.screenWidth).fill(' ');
    }

    const sinA = Math.sin(A)
    const cosA = Math.cos(A)
    const sinB = Math.sin(B)
    const cosB = Math.cos(B)
    const sinC = Math.sin(C)
    const cosC = Math.cos(C)

    if(lightSourceVector.magnitude === 0) return screen
    for (let alpha = 0; alpha < 2 * Math.PI; alpha += shapeProperties.alphaSpacing) {
        const cosAlpha = Math.cos(alpha);
        const sinAlpha = Math.sin(alpha);
        let x = shapeProperties.donutRadius + shapeProperties.donutThicknessRadius * cosAlpha;
        let y = shapeProperties.donutThicknessRadius * sinAlpha;

        for (let beta = 0; beta < 2 * Math.PI; beta += shapeProperties.betaSpacing) {
            const cosBeta = Math.cos(beta);
            const sinBeta = Math.sin(beta);
            // after y rotation
            let newX = (x*cosBeta*cosB-sinB*(y*sinA+cosA*x*sinBeta))*cosC+sinC*(y*cosA-sinA*x*sinBeta);
            let newY = -(x*cosBeta*cosB-sinB*(y*sinA+cosA*x*sinBeta))*sinC+cosC*(y*cosA-sinA*x*sinBeta);
            let newZ = -sinB*x*cosBeta-cosB*(y*sinA+cosA*x*sinBeta) + shapeProperties.distanceOfDonutFromViewer
            const ooz = 1 / newZ;

            const projectedX = Math.floor(shapeProperties.screenWidth / 2 + newX * distanceOfScreenFromViewer * ooz);
            const projectedY = Math.floor(shapeProperties.screenHeight / 2 - newY * distanceOfScreenFromViewer * ooz);

            if(projectedX < 0 || projectedX >= shapeProperties.screenWidth || isNaN(projectedX)) continue;
            if(projectedY < 0 || projectedY >= shapeProperties.screenHeight || isNaN(projectedY)) continue;

            let newLuminanceX = (cosAlpha*cosBeta*cosB-sinB*(+sinAlpha*sinA+cosA*cosAlpha*sinBeta))*cosC+sinC*(sinAlpha*cosA-sinA*cosAlpha*sinBeta);
            let newLuminanceY = -(cosAlpha*cosBeta*cosB-sinB*(+sinAlpha*sinA+cosA*cosAlpha*sinBeta))*sinC+cosC*(sinAlpha*cosA-sinA*cosAlpha*sinBeta);
            let newLuminanceZ = -sinB*cosAlpha*cosBeta-cosB*(sinAlpha*sinA+cosA*cosAlpha*sinBeta)

            const luminanceProduct = newLuminanceX*lightSourceVector.x+newLuminanceY*lightSourceVector.y+newLuminanceZ*lightSourceVector.z+1;

            if (ooz > zDistances[projectedY][projectedX]) {
                let luminanceIndex = Math.floor(luminanceProduct * 5.9);

                zDistances[projectedY][projectedX] = ooz;
                screen[projectedY][projectedX] = ".,-~:;=!*#$@"[luminanceIndex];
            }
        }
    }
    return screen;
}
const renderCube = (A: number, B: number, C: number, shapeProperties: any): string[][] => {
    const lightSourceVector = new Vector(shapeProperties.lightSourceX, shapeProperties.lightSourceY, shapeProperties.lightSourceZ).normalize()
    const zDistances: number[][] = [];
    const screen: string[][] = [];
    const cubeRadius = shapeProperties.donutRadius * 2.5
    const spacing = shapeProperties.alphaSpacing * 5

    for (let y = 0; y < shapeProperties.screenHeight; y++) {
        zDistances[y] = new Array(shapeProperties.screenWidth).fill(0);
        screen[y] = new Array(shapeProperties.screenWidth).fill(' ');
    }

    const sinA = Math.sin(A)
    const cosA = Math.cos(A)
    const sinB = Math.sin(B)
    const cosB = Math.cos(B)
    const sinC = Math.sin(C)
    const cosC = Math.cos(C)

    let luminances: Vector[] = [
        new Vector(0,0,-1),
        new Vector(0,0,1),
        new Vector(-1,0,0),
        new Vector(1,0,0),
        new Vector(0,-1,0),
        new Vector(0,1,0),
    ];

    if(lightSourceVector.magnitude === 0) return screen
    for (let i = -cubeRadius; i < cubeRadius; i += spacing) {
        for (let j = -cubeRadius; j < cubeRadius; j += spacing) {
            let points: Point[] = [];
            points.push(new Point(i, j, -cubeRadius))
            points.push(new Point(i, j, cubeRadius))
            points.push(new Point(-cubeRadius, i, j))
            points.push(new Point(cubeRadius, i, j))
            points.push(new Point(i, -cubeRadius, j))
            points.push(new Point(i, cubeRadius, j))

            for(let k = 0; k < 6; k++) {
                let x = points[k].x;
                let y = points[k].y;
                let z = points[k].z;

                let newX = cosC*(x*cosB+sinB*(-y*sinA+z*cosA))+sinC*(y*cosA+z*sinA)
                let newY = -sinC*(x*cosB+sinB*(-y*sinA+z*cosA))+cosC*(y*cosA+z*sinA)
                let newZ = -x*sinB + cosB*(-y*sinA+z*cosA)+shapeProperties.distanceOfDonutFromViewer

                const ooz = 1 / newZ;

                const projectedX = Math.floor(shapeProperties.screenWidth / 2 + newX);
                const projectedY = Math.floor(shapeProperties.screenHeight / 2 - newY);

                if(projectedX < 0 || projectedX >= shapeProperties.screenWidth || isNaN(projectedX)) continue;
                if(projectedY < 0 || projectedY >= shapeProperties.screenHeight || isNaN(projectedY)) continue;

                let luminanceX = luminances[k].x;
                let luminanceY= luminances[k].y;
                let luminanceZ= luminances[k].z;

                let newLuminanceX = cosC*(luminanceX*cosB+sinB*(-luminanceY*sinA+luminanceZ*cosA))+sinC*(luminanceY*cosA+luminanceZ*sinA)
                let newLuminanceY = -sinC*(luminanceX*cosB+sinB*(-luminanceY*sinA+luminanceZ*cosA))+cosC*(luminanceY*cosA+luminanceZ*sinA)
                let newLuminanceZ = -luminanceX*sinB+cosB*(-luminanceY*sinA+luminanceZ*cosA)

                let luminanceProduct = newLuminanceX*lightSourceVector.x+newLuminanceY*lightSourceVector.y+newLuminanceZ*lightSourceVector.z+1;

                if (ooz > zDistances[projectedY][projectedX]) {
                    let luminanceIndex = Math.floor(luminanceProduct * 5.9);

                    zDistances[projectedY][projectedX] = ooz;
                    screen[projectedY][projectedX] = ".,-~:;=!*#$@"[luminanceIndex];
                }
            }
        }
    }
    return screen;
}