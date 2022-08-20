import NullableBaseColor from './nullableBaseColor';
import CMYKColor from './cmykColor';
import { EColorChannel, EColorSource } from './enumerations';
import IBaseColor from './iBaseColor';
import { getColorChannel } from './maps';

export default class RGBColor extends NullableBaseColor implements IBaseColor {
  public readonly red: bigint;
  public readonly green: bigint;
  public readonly blue: bigint;
  public readonly bitDepth: number;
  public readonly sourceColorBase: EColorSource;
  public readonly maxValue: bigint;
  public constructor (bitDepth: number, red: bigint | null, green: bigint | null, blue: bigint | null) {
    const isNull = (red === null && green === null && blue === null);
    if (!isNull && (red === null || green === null || blue === null)) {
      throw new Error('RGBColor: All parameters must be provided or null.');
    }
    super(EColorSource.RGB, bitDepth, isNull);
    /* these three lines should be in the super constructor */
    this.bitDepth = bitDepth;
    this.sourceColorBase = EColorSource.RGB;
    this.maxValue = 2n ** BigInt(bitDepth) - 1n;
    // end super constructor code
    this.red = red === null ? 0n : NullableBaseColor.boundValue(red, this.maxValue);
    this.green = green === null ? 0n : NullableBaseColor.boundValue(green, this.maxValue);
    this.blue = blue === null ? 0n : NullableBaseColor.boundValue(blue, this.maxValue);
    this.channelData[getColorChannel(EColorSource.RGB, EColorChannel.Red)] = this.red;
    this.channelData[getColorChannel(EColorSource.RGB, EColorChannel.Green)] = this.green;
    this.channelData[getColorChannel(EColorSource.RGB, EColorChannel.Blue)] = this.blue;
    if (!this.validate()) {
      throw new Error('RGBColor: Invalid color');
    }
  }

  public static makeRGBfromCMYK (cyan: bigint, magenta: bigint, yellow: bigint, black: bigint, bitDepth: number): RGBColor {
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
    return new RGBColor(bitDepth, red, green, blue);
  }

  public toCMYKColor (): CMYKColor {
    if (this.isNull) {
      return new CMYKColor(this.bitDepth, null, null, null, null);
    } else {
      return CMYKColor.fromRGB(this.red, this.green, this.blue, this.bitDepth);
    }
  }

  public validate (): boolean {
    return super.validate() &&
            (this.red >= 0n && this.red <= this.maxValue) &&
            (this.green >= 0n && this.green <= this.maxValue) &&
            (this.blue >= 0n && this.blue <= this.maxValue);
  }

  public xor (other: NullableBaseColor): NullableBaseColor {
    if (other === null || other === undefined) {
      throw new Error('RGBColor: Other cannot be null');
    }
    if (!(other instanceof RGBColor)) {
      throw new Error('RGBColor: Other must be a RGBColor');
    }
    if (other.bitDepth !== this.bitDepth) {
      throw new Error('RGBColor: Bit depth must be the same.');
    }
    const xorRed = this.red ^ other.red;
    const xorGreen = this.green ^ other.green;
    const xorBlue = this.blue ^ other.blue;
    return new RGBColor( this.bitDepth, xorRed, xorGreen, xorBlue);
  }

  public add (other: NullableBaseColor): NullableBaseColor {
    if (other === null || other === undefined) {
      throw new Error('RGBColor: Other cannot be null');
    }
    if (!(other instanceof RGBColor)) {
      throw new Error('RGBColor: Other must be a RGBColor');
    }
    if (other.bitDepth !== this.bitDepth) {
      throw new Error('RGBColor: Bit depth must be the same.');
    }
    const addRed = this.red + other.red;
    const addGreen = this.green + other.green;
    const addBlue = this.blue + other.blue;
    return new RGBColor(this.bitDepth, addRed, addGreen, addBlue);
  }

  public subtract (other: NullableBaseColor): NullableBaseColor {
    if (other === null || other === undefined) {
      throw new Error('RGBColor: Other cannot be null');
    }
    if (!(other instanceof RGBColor)) {
      throw new Error('RGBColor: Other must be a RGBColor');
    }

    if (other.bitDepth !== this.bitDepth) {
      throw new Error('RGBColor: Bit depth must be the same.');
    }
    const subtractRed = this.red - other.red;
    const subtractGreen = this.green - other.green;
    const subtractBlue = this.blue - other.blue;
    return new RGBColor( this.bitDepth, subtractRed, subtractGreen, subtractBlue);
  }

  public multiply (other: NullableBaseColor): NullableBaseColor {
    if (other === null || other === undefined) {
      throw new Error('RGBColor: Other cannot be null');
    }
    if (!(other instanceof RGBColor)) {
      throw new Error('RGBColor: Other must be a RGBColor');
    }

    if (other.bitDepth !== this.bitDepth) {
      throw new Error('RGBColor: Bit depth must be the same.');
    }
    const multiplyRed = this.red * other.red;
    const multiplyGreen = this.green * other.green;
    const multiplyBlue = this.blue * other.blue;
    return new RGBColor(this.bitDepth, multiplyRed, multiplyGreen, multiplyBlue);
  }

  public divide (other: NullableBaseColor): NullableBaseColor {
    if (other === null || other === undefined) {
      throw new Error('RGBColor: Other cannot be null');
    }
    if (!(other instanceof RGBColor)) {
      throw new Error('RGBColor: Other must be a RGBColor');
    }

    if (other.bitDepth !== this.bitDepth) {
      throw new Error('RGBColor: Bit depth must be the same.');
    }
    const divideRed = this.red / other.red;
    const divideGreen = this.green / other.green;
    const divideBlue = this.blue / other.blue;
    return new RGBColor(this.bitDepth, divideRed, divideGreen, divideBlue);
  }
}
