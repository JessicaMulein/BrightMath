import NullableBaseColor from './nullableBaseColor';
import { EColorSpace } from './enumerations';
import { IBaseColor } from './interfaces';
import NotImplementedError from './notImplementedError';
import { boundValue } from './bigMath';
import { convertCMYKtoRGB } from './cmykConverters';

export default class CMYKColor extends NullableBaseColor implements IBaseColor {
  public readonly cyan: number;
  public readonly magenta: number;
  public readonly yellow: number;
  public readonly black: number;
  public constructor (cyan: number | null, magenta: number | null, yellow: number | null, black: number | null) {
    const isNull = (cyan === null && magenta === null && yellow === null && black === null);
    if (!isNull && (cyan === null || magenta === null || yellow === null || black === null)) {
      throw new Error('CMYKColor: All parameters must be provided or null.');
    }
    super(EColorSpace.CMYK, isNull);
    this.cyan = cyan === null ? 0 : boundValue(cyan);
    this.magenta = magenta === null ? 0 : boundValue(magenta);
    this.yellow = yellow === null ? 0 : boundValue(yellow);
    this.black = black === null ? 0 : boundValue(black);
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
            (this.cyan >= 0 && this.cyan <= 1) &&
            (this.magenta >= 0 && this.magenta <= 1) &&
            (this.yellow >= 0 && this.yellow <= 1) &&
            (this.black >= 0 && this.black <= 1);
  }

  public xor (other: NullableBaseColor): NullableBaseColor {
    if (other === null || other === undefined) {
      throw new Error('CMYKColor: Other cannot be null');
    }
    if (!(other instanceof CMYKColor)) {
      throw new Error('CMYKColor: Other must be a CMYKColor');
    }

    const xorCyan = this.cyan ^ other.cyan;
    const xorMagenta = this.magenta ^ other.magenta;
    const xorYellow = this.yellow ^ other.yellow;
    const xorBlack = this.black ^ other.black;
    return new CMYKColor(xorCyan, xorMagenta, xorYellow, xorBlack);
  }

  public add (other: NullableBaseColor): NullableBaseColor {
    if (other === null || other === undefined) {
      throw new Error('CMYKColor: Other cannot be null');
    }
    if (!(other instanceof CMYKColor)) {
      throw new Error('CMYKColor: Other must be a CMYKColor');
    }
    const addCyan = this.cyan + other.cyan;
    const addMagenta = this.magenta + other.magenta;
    const addYellow = this.yellow + other.yellow;
    const addBlack = this.black + other.black;
    return new CMYKColor(addCyan, addMagenta, addYellow, addBlack);
  }

  public subtract (other: NullableBaseColor): NullableBaseColor {
    if (other === null || other === undefined) {
      throw new Error('CMYKColor: Other cannot be null');
    }
    if (!(other instanceof CMYKColor)) {
      throw new Error('CMYKColor: Other must be a CMYKColor');
    }
    const subtractCyan = this.cyan - other.cyan;
    const subtractMagenta = this.magenta - other.magenta;
    const subtractYellow = this.yellow - other.yellow;
    const subtractBlack = this.black - other.black;
    return new CMYKColor(subtractCyan, subtractMagenta, subtractYellow, subtractBlack);
  }

  public multiply (other: NullableBaseColor): NullableBaseColor {
    if (other === null || other === undefined) {
      throw new Error('CMYKColor: Other cannot be null');
    }
    if (!(other instanceof CMYKColor)) {
      throw new Error('CMYKColor: Other must be a CMYKColor');
    }
    const multiplyCyan = this.cyan * other.cyan;
    const multiplyMagenta = this.magenta * other.magenta;
    const multiplyYellow = this.yellow * other.yellow;
    const multiplyBlack = this.black * other.black;
    return new CMYKColor(multiplyCyan, multiplyMagenta, multiplyYellow, multiplyBlack);
  }

  public divide (other: NullableBaseColor): NullableBaseColor {
    if (other === null || other === undefined) {
      throw new Error('CMYKColor: Other cannot be null');
    }
    if (!(other instanceof CMYKColor)) {
      throw new Error('CMYKColor: Other must be a CMYKColor');
    }
    const divideCyan = this.cyan / other.cyan;
    const divideMagenta = this.magenta / other.magenta;
    const divideYellow = this.yellow / other.yellow;
    const divideBlack = this.black / other.black;
    return new CMYKColor( divideCyan, divideMagenta, divideYellow, divideBlack);
  }
}
