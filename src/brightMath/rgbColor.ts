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
  public readonly red: number;
  public readonly green: number;
  public readonly blue: number;
  public readonly rgbColorSpace: RGBColorSpace | null;
  public constructor (red: number | null, green: number | null, blue: number | null, colorSpace: RGBColorSpace | null = null) {
    const isNull = (red === null && green === null && blue === null);
    if (!isNull && (red === null || green === null || blue === null)) {
      throw new Error('RGBColor: All parameters must be provided or null.');
    }
    super(EColorSpace.RGB, isNull);
    this.rgbColorSpace = colorSpace;
    this.red = red === null ? 0 : boundValue(red);
    this.green = green === null ? 0 : boundValue(green);
    this.blue = blue === null ? 0 : boundValue(blue);
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
          return new CMYKColor(null, null, null, null);
        } else {
          return convertRGBtoCMYK(this.red, this.green, this.blue);
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
        return new RGBAColor(this.red, this.green, this.blue, 0);
      } else if (other === EColorSpace.RGB) {
        return this;
      } else {
        throw new Error('RGBAColor.to: Unknown color space');
      }
    }}

  public override validate (): boolean {
    return super.validate() &&
            (this.red >= 0 && this.red <= 1) &&
            (this.green >= 0 && this.green <= 1) &&
            (this.blue >= 0 && this.blue <= 1);
  }

  public xor (other: NullableBaseColor): NullableBaseColor {
    throw new Error("TODO: go discrete first or XOR the bits of the double?");
    if (other === null || other === undefined) {
      throw new Error('RGBColor: Other cannot be null');
    }
    if (!(other instanceof RGBColor)) {
      throw new Error('RGBColor: Other must be a RGBColor');
    }
    const otherRGB = other as RGBColor;
    const xorRed = this.red ^ otherRGB.red;
    const xorGreen = this.green ^ otherRGB.green;
    const xorBlue = this.blue ^ otherRGB.blue;
    return new RGBColor(xorRed, xorGreen, xorBlue);
  }

  public add (other: NullableBaseColor): NullableBaseColor {
    if (other === null || other === undefined) {
      throw new Error('RGBColor: Other cannot be null');
    }
    if (!(other instanceof RGBColor)) {
      throw new Error('RGBColor: Other must be a RGBColor');
    }
    const addRed = this.red + other.red;
    const addGreen = this.green + other.green;
    const addBlue = this.blue + other.blue;
    return new RGBColor(addRed, addGreen, addBlue);
  }

  public subtract (other: NullableBaseColor): NullableBaseColor {
    if (other === null || other === undefined) {
      throw new Error('RGBColor: Other cannot be null');
    }
    if (!(other instanceof RGBColor)) {
      throw new Error('RGBColor: Other must be a RGBColor');
    }
    const subtractRed = this.red - other.red;
    const subtractGreen = this.green - other.green;
    const subtractBlue = this.blue - other.blue;
    return new RGBColor(subtractRed, subtractGreen, subtractBlue);
  }

  public multiply (other: NullableBaseColor): NullableBaseColor {
    if (other === null || other === undefined) {
      throw new Error('RGBColor: Other cannot be null');
    }
    if (!(other instanceof RGBColor)) {
      throw new Error('RGBColor: Other must be a RGBColor');
    }
    const multiplyRed = this.red * other.red;
    const multiplyGreen = this.green * other.green;
    const multiplyBlue = this.blue * other.blue;
    return new RGBColor(multiplyRed, multiplyGreen, multiplyBlue);
  }

  public divide (other: NullableBaseColor): NullableBaseColor {
    if (other === null || other === undefined) {
      throw new Error('RGBColor: Other cannot be null');
    }
    if (!(other instanceof RGBColor)) {
      throw new Error('RGBColor: Other must be a RGBColor');
    }
    const divideRed = this.red / other.red;
    const divideGreen = this.green / other.green;
    const divideBlue = this.blue / other.blue;
    return new RGBColor(divideRed, divideGreen, divideBlue);
  }
}
