import NullableBaseColor from './nullableBaseColor';
import { EColorChannel, EColorSpace } from './enumerations';
import { IBaseColor } from './interfaces';
import RGBColor from './rgbColor';
import { getColorChannelIndex } from './maps';
import NotImplementedError from './notImplementedError';
import { boundValue } from './bigMath';
import { convertRGBtoCMYK } from './cmykConverters';
import CMYKColor from './cmykColor';
import { RGBColorSpace } from './rgbColorSpace';

export default class RGBAColor extends RGBColor implements IBaseColor {
  public readonly alpha: bigint;
  public constructor (bitDepth: number, red: bigint | null, green: bigint | null, blue: bigint | null, alpha: bigint | null, colorSpace: RGBColorSpace | null = null) {
    const isNull = (red === null && green === null && blue === null && alpha === null);
    if (!isNull && (red === null || green === null || blue === null || alpha === null)) {
      throw new Error('RGBAColor: All parameters must be provided or null.');
    }
    super(bitDepth, red, green, blue, colorSpace);
    this.alpha = alpha === null ? 0n : boundValue(alpha, this.maxValue);
    if (!this.validate()) {
      throw new Error('RGBAColor: Invalid color');
    }
    this.channelData[getColorChannelIndex(EColorSpace.RGBA, EColorChannel.Alpha)] = this.alpha;
    if (!this.validate()) {
      throw new Error('RGBAColor: Invalid color');
    }
  }

  public override to: (other: EColorSpace) => NullableBaseColor = (other) => {
    {
        if (other === EColorSpace.CMYK) {
          if (this.isNull) {
            return new CMYKColor(this.bitDepth, null, null, null, null);
          }
          return convertRGBtoCMYK(this.red, this.green, this.blue, this.bitDepth);
        } else if (other === EColorSpace.HSV) {
          throw new NotImplementedError();
        } else if (other === EColorSpace.Lab) {
        throw new NotImplementedError();
        } else if (other === EColorSpace.XYZ) {
        throw new NotImplementedError();
        } else if (other === EColorSpace.xyY) {
        throw new NotImplementedError();
        } else if (other === EColorSpace.RGBA) {
          return this;
        } else if (other === EColorSpace.RGB) {
          return new RGBColor(this.bitDepth, this.red, this.green, this.blue);
        } else {
          throw new Error('RGBAColor.to: Unknown color space');
        }
      }}

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
