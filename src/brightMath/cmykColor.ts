import NullableBaseColor from './nullableBaseColor';
import { EColorSpace } from './enumerations';
import { IBaseColor } from './interfaces';
import RGBColor from './rgbColor';
import RGBAColor from './rgbaColor';
import NotImplementedError from './notImplementedError';
import { bigMax, boundValue } from './bigMath';

export default class CMYKColor extends NullableBaseColor implements IBaseColor {
  public readonly cyan: bigint;
  public readonly magenta: bigint;
  public readonly yellow: bigint;
  public readonly black: bigint;
  public constructor (bitDepth: number, cyan: bigint | null, magenta: bigint | null, yellow: bigint | null, black: bigint | null) {
    const isNull = (cyan === null && magenta === null && yellow === null && black === null);
    if (!isNull && (cyan === null || magenta === null || yellow === null || black === null)) {
      throw new Error('CMYKColor: All parameters must be provided or null.');
    }
    super(EColorSpace.CMYK, bitDepth, isNull);
    this.cyan = cyan === null ? 0n : boundValue(cyan, this.maxValue);
    this.magenta = magenta === null ? 0n : boundValue(magenta, this.maxValue);
    this.yellow = yellow === null ? 0n : boundValue(yellow, this.maxValue);
    this.black = black === null ? 0n : boundValue(black, this.maxValue);
    if (!this.validate()) {
      throw new Error('CMYKColor: Invalid color');
    }
  }

  public to: (other: EColorSpace) => NullableBaseColor = (other) => {
    {
        if (other === EColorSpace.CMYK) {
          return this;
        } else if (other === EColorSpace.HSV) {
          throw new NotImplementedError();
        } else if (other === EColorSpace.Lab) {
        throw new NotImplementedError();
        } else if (other === EColorSpace.XYZ) {
        throw new NotImplementedError();
        } else if (other === EColorSpace.xyY) {
        throw new NotImplementedError();
        } else if (other === EColorSpace.RGBA) {
          throw new NotImplementedError();
        } else if (other === EColorSpace.RGB) {
          throw new NotImplementedError();
        } else {
          throw new Error('RGBAColor.to: Unknown color space');
        }
      }}

  public static fromRGB (red: bigint, green: bigint, blue: bigint, bitDepth: number): CMYKColor {
    /*
        RGB to CMYK conversion formula
        The R,G,B values are divided by 255 to change the range from 0..255 to 0..1:

        R' = R/255

        G' = G/255

        B' = B/255

        The black key (K) color is calculated from the red (R'), green (G') and blue (B') colors:

        K = 1-max(R', G', B')

        The cyan color (C) is calculated from the red (R') and black (K) colors:

        C = (1-R'-K) / (1-K)

        The magenta color (M) is calculated from the green (G') and black (K) colors:

        M = (1-G'-K) / (1-K)

        The yellow color (Y) is calculated from the blue (B') and black (K) colors:

        Y = (1-B'-K) / (1-K)
    */
    const bitMax = 2n ** BigInt(bitDepth) - 1n;
    const redPrime = red / bitMax;
    const greenPrime = green / bitMax;
    const bluePrime = blue / bitMax;
    // const max = Math.max(redPrime, greenPrime, bluePrime);
    const max = bigMax(bitMax, redPrime, greenPrime, bluePrime);
    const black = 1n - max;
    const cyan = (1n - redPrime - black) / (1n - black);
    const magenta = (1n - greenPrime - black) / (1n - black);
    const yellow = (1n - bluePrime - black) / (1n - black);
    return new CMYKColor(bitDepth, cyan, magenta, yellow, black);
  }

  public toRGBColor (): RGBColor {
    if (this.isNull) {
      return new RGBColor(this.bitDepth, null, null, null);
    } else {
      return RGBColor.makeRGBfromCMYK(this.cyan, this.magenta, this.yellow, this.black, this.bitDepth);
    }
  }

  public toRGBAColor (newAlpha: bigint): RGBAColor {
    if (this.isNull) {
      return new RGBAColor(this.bitDepth, null, null, null, null);
    } else {
      return RGBAColor.makeRGBAfromCMYK(this.cyan, this.magenta, this.yellow, this.black, newAlpha, this.bitDepth);
    }
  }

  public override validate (): boolean {
    return super.validate() &&
            (this.cyan >= 0n && this.cyan <= this.maxValue) &&
            (this.magenta >= 0n && this.magenta <= this.maxValue) &&
            (this.yellow >= 0n && this.yellow <= this.maxValue) &&
            (this.black >= 0n && this.black <= this.maxValue);
  }

  public xor (other: NullableBaseColor): NullableBaseColor {
    if (other === null || other === undefined) {
      throw new Error('CMYKColor: Other cannot be null');
    }
    if (!(other instanceof CMYKColor)) {
      throw new Error('CMYKColor: Other must be a CMYKColor');
    }
    if (this.bitDepth !== other.bitDepth) {
      throw new Error('CMYKColor: Bit depth must be the same.');
    }

    const xorCyan = this.cyan ^ other.cyan;
    const xorMagenta = this.magenta ^ other.magenta;
    const xorYellow = this.yellow ^ other.yellow;
    const xorBlack = this.black ^ other.black;
    return new CMYKColor(this.bitDepth, xorCyan, xorMagenta, xorYellow, xorBlack);
  }

  public add (other: NullableBaseColor): NullableBaseColor {
    if (other === null || other === undefined) {
      throw new Error('CMYKColor: Other cannot be null');
    }
    if (!(other instanceof CMYKColor)) {
      throw new Error('CMYKColor: Other must be a CMYKColor');
    }
    if (this.bitDepth !== other.bitDepth) {
      throw new Error('CMYKColor: Bit depth must be the same.');
    }
    const addCyan = this.cyan + other.cyan;
    const addMagenta = this.magenta + other.magenta;
    const addYellow = this.yellow + other.yellow;
    const addBlack = this.black + other.black;
    return new CMYKColor(this.bitDepth, addCyan, addMagenta, addYellow, addBlack);
  }

  public subtract (other: NullableBaseColor): NullableBaseColor {
    if (other === null || other === undefined) {
      throw new Error('CMYKColor: Other cannot be null');
    }
    if (!(other instanceof CMYKColor)) {
      throw new Error('CMYKColor: Other must be a CMYKColor');
    }
    if (this.bitDepth !== other.bitDepth) {
      throw new Error('CMYKColor: Bit depth must be the same.');
    }
    const subtractCyan = this.cyan - other.cyan;
    const subtractMagenta = this.magenta - other.magenta;
    const subtractYellow = this.yellow - other.yellow;
    const subtractBlack = this.black - other.black;
    return new CMYKColor(this.bitDepth, subtractCyan, subtractMagenta, subtractYellow, subtractBlack);
  }

  public multiply (other: NullableBaseColor): NullableBaseColor {
    if (other === null || other === undefined) {
      throw new Error('CMYKColor: Other cannot be null');
    }
    if (!(other instanceof CMYKColor)) {
      throw new Error('CMYKColor: Other must be a CMYKColor');
    }
    if (this.bitDepth !== other.bitDepth) {
      throw new Error('CMYKColor: Bit depth must be the same.');
    }
    const multiplyCyan = this.cyan * other.cyan;
    const multiplyMagenta = this.magenta * other.magenta;
    const multiplyYellow = this.yellow * other.yellow;
    const multiplyBlack = this.black * other.black;
    return new CMYKColor(this.bitDepth, multiplyCyan, multiplyMagenta, multiplyYellow, multiplyBlack);
  }

  public divide (other: NullableBaseColor): NullableBaseColor {
    if (other === null || other === undefined) {
      throw new Error('CMYKColor: Other cannot be null');
    }
    if (!(other instanceof CMYKColor)) {
      throw new Error('CMYKColor: Other must be a CMYKColor');
    }
    if (this.bitDepth !== other.bitDepth) {
      throw new Error('CMYKColor: Bit depth must be the same.');
    }
    const divideCyan = this.cyan / other.cyan;
    const divideMagenta = this.magenta / other.magenta;
    const divideYellow = this.yellow / other.yellow;
    const divideBlack = this.black / other.black;
    return new CMYKColor(this.bitDepth, divideCyan, divideMagenta, divideYellow, divideBlack);
  }
}
