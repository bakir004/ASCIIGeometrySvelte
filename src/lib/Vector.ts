export class Vector {
    x: number;
    y: number;
    z: number;
    magnitude: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.magnitude = Math.sqrt(x * x + y * y + z * z);
    }

    normalize(): Vector {
        if(this.x === 0 && this.y === 0 && this.z === 0) return this;
        return new Vector(
            this.x / this.magnitude,
            this.y / this.magnitude,
            this.z / this.magnitude
        );
    }
}