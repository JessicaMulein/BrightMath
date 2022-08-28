import NullableBaseColor from './nullableBaseColor';
import CMYKColor from './cmykColor';
import { EColorChannel, EColorSpace, ELabWhitePoint, ERGBColorSpace } from './enumerations';
import { IBaseColor, IRGBColor } from './interfaces';
import { getColorChannelIndex } from './maps';
import NotImplementedError from './notImplementedError';
import { boundValue } from './bigMath';
import { convertRGBtoCMYK } from './cmykConverters';
import RGBAColor from './rgbaColor';
import { RGBColorSpace } from './rgbColorSpace';

export default class RGBColor extends NullableBaseColor implements IBaseColor, IRGBColor {
  public readonly red: bigint;
  public readonly green: bigint;
  public readonly blue: bigint;
  public readonly rgbColorSpace: RGBColorSpace | null;
  public constructor (bitDepth: number, red: bigint | null, green: bigint | null, blue: bigint | null, colorSpace: RGBColorSpace | null = null) {
    const isNull = (red === null && green === null && blue === null);
    if (!isNull && (red === null || green === null || blue === null)) {
      throw new Error('RGBColor: All parameters must be provided or null.');
    }
    super(EColorSpace.RGB, bitDepth, isNull);
    this.rgbColorSpace = colorSpace;
    this.red = red === null ? 0n : boundValue(red, this.maxValue);
    this.green = green === null ? 0n : boundValue(green, this.maxValue);
    this.blue = blue === null ? 0n : boundValue(blue, this.maxValue);
    this.channelData[getColorChannelIndex(EColorSpace.RGB, EColorChannel.Red)] = this.red;
    this.channelData[getColorChannelIndex(EColorSpace.RGB, EColorChannel.Green)] = this.green;
    this.channelData[getColorChannelIndex(EColorSpace.RGB, EColorChannel.Blue)] = this.blue;

    if (!this.validate()) {
      throw new Error('RGBColor: Invalid color');
    }
  }

  public to: (other: EColorSpace) => NullableBaseColor = (other) => {
  {
      if (other === EColorSpace.CMYK) {
        if (this.isNull) {
          return new CMYKColor(this.bitDepth, null, null, null, null);
        } else {
          return convertRGBtoCMYK(this.red, this.green, this.blue, this.bitDepth);
        }
      } else if (other === EColorSpace.HSV) {
        throw new NotImplementedError();
      } else if (other === EColorSpace.Lab) {
      throw new NotImplementedError();
      } else if (other === EColorSpace.XYZ) {
      throw new NotImplementedError();
      } else if (other === EColorSpace.xyY) {
      throw new NotImplementedError();
      } else if (other === EColorSpace.RGBA) {
        return new RGBAColor(this.bitDepth, this.red, this.green, this.blue, 0n);
      } else if (other === EColorSpace.RGB) {
        return this;
      } else {
        throw new Error('RGBAColor.to: Unknown color space');
      }
    }}

  public override validate (): boolean {
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
