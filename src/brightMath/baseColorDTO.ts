/**
 * summary: DTO (Data Transfer Object) for the base color object, which can currently be either a CMYKColor or RGBColor.
 *         The color names do not overlap so they can all coexist.
 *         It is expected that if one of red/green/blue(/alpha) is provided, all are provided.
 *         If one of cyan/magenta/yellow/black is provided, all must be provided.
 *         Do not provide both cyan/magenta/yellow/black and red/green/blue(/alpha).
 *         If alpha is provided as anything other than undefined, an RGBAColor is created.
 */
export default class BaseColorDataTransferObject {
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