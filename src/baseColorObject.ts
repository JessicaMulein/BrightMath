export default class BaseColorObject {
    red: bigint | null | undefined;
    green: bigint | null | undefined;
    blue: bigint | null | undefined;
    cyan: bigint | null | undefined;
    magenta: bigint | null | undefined;
    yellow: bigint | null | undefined;
    black: bigint | null | undefined;
    alpha: bigint | null | undefined;
    bitDepth: number;
    constructor(bitDepth: number, red: bigint | null | undefined, green: bigint | null | undefined, blue: bigint | null | undefined, cyan: bigint | null | undefined, magenta: bigint | null | undefined, yellow: bigint | null | undefined, black: bigint | null | undefined, alpha: bigint | null | undefined) {
        this.bitDepth = bitDepth;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.cyan = cyan;
        this.magenta = magenta;
        this.yellow = yellow;
        this.black = black;
        this.alpha = alpha;
    }
}