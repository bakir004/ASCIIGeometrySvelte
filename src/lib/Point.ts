export class Point {
    x: number;
    y: number;
    z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(other: Point): Point {
        return new Point(this.x + other.x, this.y + other.y, this.z + other.z);
    }
}