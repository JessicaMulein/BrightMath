import ApproximatedColorPair from "./approximatedColorPair";
import CMYKColor from "./cmykColor";
import NullableBaseColor from "./nullableBaseColor";
import RGBAColor from "./rgbaColor";
import RGBColor from "./rgbColor";

/**
 * summary: DTO (Data Transfer Object) for the base color object, which can currently be either a CMYKColor or RGBColor.
 *         The color names do not overlap so they can all coexist.
 *         It is expected that if one of red/green/blue(/alpha) is provided, all are provided.
 *         If one of cyan/magenta/yellow/black is provided, all must be provided.
 *         Do not provide both cyan/magenta/yellow/black and red/green/blue(/alpha).
 *         If alpha is provided as anything other than undefined, an RGBAColor is created.
 */
export default class BaseColorDataTransferObject {
    public readonly red: bigint | null | undefined;
    public readonly green: bigint | null | undefined;
    public readonly blue: bigint | null | undefined;
    public readonly cyan: bigint | null | undefined;
    public readonly magenta: bigint | null | undefined;
    public readonly yellow: bigint | null | undefined;
    public readonly black: bigint | null | undefined;
    public readonly alpha: bigint | null | undefined;
    public readonly bitDepth: number;
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
    public toCMYK(): CMYKColor {
        if (this.cyan !== undefined && this.magenta !== undefined && this.yellow !== undefined && this.black !== undefined) {
            return new CMYKColor(this.bitDepth, this.cyan, this.magenta, this.yellow, this.black);
        }
        throw new Error("Cannot convert to CMYKColor without cyan, magenta, yellow, and black values.");
    }
    public toRGB(): RGBColor {
        if (this.red !== undefined && this.green !== undefined && this.blue !== undefined) {
            return new RGBColor(this.bitDepth, this.red, this.green, this.blue);
        }
        throw new Error("Cannot convert to RGBColor without red, green, and blue values.");
    }
    public toRGBA(): RGBAColor {
        if (this.red !== undefined && this.green !== undefined && this.blue !== undefined && this.alpha !== undefined) {
            return new RGBAColor(this.bitDepth, this.red, this.green, this.blue, this.alpha);
        }
        throw new Error("Cannot convert to RGBColor without red, green, blue, and alpha values.");
    }
    public toBaseColor(): NullableBaseColor {
        return NullableBaseColor.fromObject(this);
    }
    public toApproximatedColorPair(): ApproximatedColorPair {
        if (this.cyan !== undefined && this.magenta !== undefined && this.yellow !== undefined && this.black !== undefined) {
            return new ApproximatedColorPair(this.toCMYK());
        } else if (this.red !== undefined && this.green !== undefined && this.blue !== undefined && this.alpha !== undefined) {
            return new ApproximatedColorPair(this.toRGBA());
        } else if (this.red !== undefined && this.green !== undefined && this.blue !== undefined) {
            return new ApproximatedColorPair(this.toRGB());
        }
        throw new Error("Cannot convert to ApproximatedColorPair without either CMYK or RGB values.");
    }
}