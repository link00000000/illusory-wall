export class Color {
    constructor(
        public r: number,
        public g: number,
        public b: number,
        public a: number
    ) {}

    private static toHexDigits(value: number) {
        return value.toString(16).padStart(2, '0')
    }

    public static random(base?: Color) {
        let color = base ?? new Color(-1, -1, -1, -1)

        if (color.r === -1) {
            color.r = Math.floor(Math.random() * 255)
        }

        if (color.g === -1) {
            color.g = Math.floor(Math.random() * 255)
        }

        if (color.b === -1) {
            color.b = Math.floor(Math.random() * 255)
        }

        color.a = 255
        return color
    }

    rgba() {
        return `rgba(${this.r},${this.g},${this.b},${this.a})`
    }

    rgb() {
        return `rgb(${this.r},${this.g},${this.b})`
    }

    hex() {
        return (
            '#' +
            Color.toHexDigits(this.r) +
            Color.toHexDigits(this.g) +
            Color.toHexDigits(this.b)
        )
    }
}
