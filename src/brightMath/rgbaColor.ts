import NullableBaseColor from './nullableBaseColor';
import CMYKColor from './cmykColor';
import { EColorChannel, EColorSource } from './enumerations';
import IBaseColor from './iBaseColor';
import RGBColor from './rgbColor';
import { getColorChannel } from './maps';

export default class RGBAColor extends RGBColor implements IBaseColor {
  public readonly alpha: bigint;
  public constructor (bitDepth: number, red: bigint | null, green: bigint | null, blue: bigint | null, alpha: bigint | null) {
    const isNull = (red === null && green === null && blue === null && alpha === null);
    if (!isNull && (red === null || green === null || blue === null || alpha === null)) {
      throw new Error('RGBAColor: All parameters must be provided or null.');
    }
    super(bitDepth, red, green, blue);
    this.alpha = alpha === null ? 0n : NullableBaseColor.boundValue(alpha, this.maxValue);
    if (!this.validate()) {
      throw new Error('RGBAColor: Invalid color');
    }
    this.channelData[getColorChannel(EColorSource.RGBA, EColorChannel.Alpha)] = this.alpha;
    if (!this.validate()) {
      throw new Error('RGBAColor: Invalid color');
    }
  }

  public static makeRGBAfromCMYK (cyan: bigint, magenta: bigint, yellow: bigint, black: bigint, newRGBAlpha: bigint, bitDepth: number): RGBAColor {
    /*
      CMYK to RGB conversion formula
      The R,G,B values are given in the range of 0..255.

      The red (R) color is calculated from the cyan (C) and black (K) colors:

      R = 255 × (1-C) × (1-K)

      The green color (G) is calculated from the magenta (M) and black (K) colors:

      G = 255 × (1-M) × (1-K)

      The blue color (B) is calculated from the yellow (Y) and black (K) colors:

      B = 255 × (1-Y) × (1-K)
    */
    const bitMax = 2n ** BigInt(bitDepth) - 1n;
    const red = bitMax * (1n - cyan) * (1n - black);
    const green = bitMax * (1n - magenta) * (1n - black);
    const blue = bitMax * (1n - yellow) * (1n - black);
    return new RGBAColor(bitDepth, red, green, blue, newRGBAlpha);
  }

  public override validate (): boolean {
    return super.validate() &&
            (this.alpha >= 0n && this.alpha <= this.maxValue);
  }

  public override xor (other: NullableBaseColor): NullableBaseColor {
    if (other === null || other === undefined) {
      throw new Error('RGBAColor: Other cannot be null');
    }
    if (!(other instanceof RGBColor)) {
      throw new Error('RGBAColor: Other must be a RGBColor');
    }
    if (other.bitDepth !== this.bitDepth) {
      throw new Error('RGBAColor: Bit depth must be the same.');
    }
    const typedOther = other as RGBAColor;
    const xorRed = this.red ^ typedOther.red;
    const xorGreen = this.green ^ typedOther.green;
    const xorBlue = this.blue ^ typedOther.blue;
    const xorAlpha = this.alpha ^ typedOther.alpha;
    return new RGBAColor(this.bitDepth, xorRed, xorGreen, xorBlue, xorAlpha);
  }

  public override add (other: NullableBaseColor): NullableBaseColor {
    if (other === null || other === undefined) {
      throw new Error('RGBAColor: Other cannot be null');
    }
    if (!(other instanceof RGBColor)) {
      throw new Error('RGBAColor: Other must be a RGBColor');
    }
    if (other.bitDepth !== this.bitDepth) {
      throw new Error('RGBAColor: Bit depth must be the same.');
    }
    const typedOther = other as RGBAColor;
    const addRed = this.red + typedOther.red;
    const addGreen = this.green + typedOther.green;
    const addBlue = this.blue + typedOther.blue;
    const addAlpha = this.alpha + typedOther.alpha;
    return new RGBAColor(this.bitDepth, addRed, addGreen, addBlue, addAlpha);
  }

  public override subtract (other: NullableBaseColor): NullableBaseColor {
    if (other === null || other === undefined) {
      throw new Error('RGBAColor: Other cannot be null');
    }
    if (!(other instanceof RGBColor)) {
      throw new Error('RGBAColor: Other must be a RGBColor');
    }
    if (other.bitDepth !== this.bitDepth) {
      throw new Error('RGBAColor: Bit depth must be the same.');
    }
    const typedOther = other as RGBAColor;
    const subtractRed = this.red - typedOther.red;
    const subtractGreen = this.green - typedOther.green;
    const subtractBlue = this.blue - typedOther.blue;
    const subtractAlpha = this.alpha - typedOther.alpha;
    return new RGBAColor(this.bitDepth, subtractRed, subtractGreen, subtractBlue, subtractAlpha);
  }

  public override multiply (other: NullableBaseColor): NullableBaseColor {
    if (other === null || other === undefined) {
      throw new Error('RGBAColor: Other cannot be null');
    }
    if (!(other instanceof RGBColor)) {
      throw new Error('RGBAColor: Other must be a RGBColor');
    }
    if (other.bitDepth !== this.bitDepth) {
      throw new Error('RGBAColor: Bit depth must be the same.');
    }
    const typedOther = other as RGBAColor;
    const multiplyRed = this.red * typedOther.red;
    const multiplyGreen = this.green * typedOther.green;
    const multiplyBlue = this.blue * typedOther.blue;
    const multiplyAlpha = this.alpha * typedOther.alpha;
    return new RGBAColor( this.bitDepth, multiplyRed, multiplyGreen, multiplyBlue, multiplyAlpha);
  }

  public override divide (other: NullableBaseColor): NullableBaseColor {
    if (other === null || other === undefined) {
      throw new Error('RGBAColor: Other cannot be null');
    }
    if (!(other instanceof RGBColor)) {
      throw new Error('RGBAColor: Other must be a RGBColor');
    }
    if (other.bitDepth !== this.bitDepth) {
      throw new Error('RGBAColor: Bit depth must be the same.');
    }
    const typedOther = other as RGBAColor;
    const divideRed = this.red / typedOther.red;
    const divideGreen = this.green / typedOther.green;
    const divideBlue = this.blue / typedOther.blue;
    const divideAlpha = this.alpha / typedOther.alpha;
    return new RGBAColor(this.bitDepth, divideRed, divideGreen, divideBlue, divideAlpha);
  }
}
