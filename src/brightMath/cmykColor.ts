import NullableBaseColor from './nullableBaseColor';
import { EColorSpace } from './enumerations';
import { IBaseColor } from './interfaces';
import NotImplementedError from './notImplementedError';
import { boundValue } from './bigMath';
import { convertCMYKtoRGB } from './cmykConverters';

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
          return convertCMYKtoRGB(this).to(EColorSpace.RGBA);
        } else if (other === EColorSpace.RGB) {
          return convertCMYKtoRGB(this);
        } else {
          throw new Error('RGBAColor.to: Unknown color space');
        }
      }}

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
