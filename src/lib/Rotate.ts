import {Point} from "./Point";
import {Vector} from "./Vector";

export function rotatePointX(point: Point, angle: number): Point {
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);
    return new Point(
        point.x,
        point.y * cosine + point.z * sine,
        -point.y * sine + point.z * cosine
    );
}

export function rotatePointY(point: Point, angle: number): Point {
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);
    return new Point(point.x * cosine + point.z * sine, point.y, -point.x * sine + point.z * cosine);
}

export function rotatePointZ(point: Point, angle: number): Point {
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);
    return new Point(
        point.x * cosine + point.y * sine,
        -point.x * sine + point.y * cosine,
        point.z
    );
}

export function rotatePointOnAll3Axes(point: Point, angleX: number, angleY: number, angleZ: number): Point {
    point = rotatePointY(point, angleY);
    point = rotatePointX(point, angleX);
    point = rotatePointZ(point, angleZ);
    return point;
}

export function rotateX(point: Vector, angle: number): Vector {
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);
    return new Vector(
        point.x,
        point.y * cosine + point.z * sine,
        -point.y * sine + point.z * cosine
    );
}

export function rotateY(point: Vector, angle: number): Vector {
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);
    return new Vector(
        point.x * cosine + point.z * sine,
        point.y,
        -point.x * sine + point.z * cosine
    );
}

export function rotateZ(point: Vector, angle: number): Vector {
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);
    return new Vector(
        point.x * cosine + point.y * sine,
        -point.x * sine + point.y * cosine,
        point.z
    );
}

export function rotateOnAll3Axes(vector: Vector, angleX: number, angleY: number, angleZ: number): Vector {
    vector = rotateY(vector, angleY);
    vector = rotateX(vector, angleX);
    vector = rotateZ(vector, angleZ);
    return vector;
}
