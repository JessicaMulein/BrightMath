import NullableBaseColor from './nullableBaseColor';
import CMYKColor from './cmykColor';
import { EColorChannel, EColorSpace } from './enumerations';
import { IBaseColor } from './interfaces';
import { getColorChannelIndex } from './maps';
import NotImplementedError from './notImplementedError';
import { boundValue } from './bigMath';

export default class HSVColor extends NullableBaseColor implements IBaseColor {
  public readonly hue: bigint;
  public readonly saturation: bigint;
  public readonly brightness: bigint;
  public constructor (bitDepth: number, hue: bigint | null, saturation: bigint | null, value: bigint | null) {
    const isNull = (hue === null && saturation === null && value === null);
    if (!isNull && (hue === null || saturation === null || value === null)) {
      throw new Error('HSVColor: All parameters must be provided or null.');
    }
    super(EColorSpace.HSV, bitDepth, isNull);
    this.hue = hue === null ? 0n : boundValue(hue, this.maxValue);
    this.saturation = saturation === null ? 0n : boundValue(saturation, this.maxValue);
    this.brightness = value === null ? 0n : boundValue(value, this.maxValue);
    this.channelData[getColorChannelIndex(EColorSpace.HSV, EColorChannel.Hue)] = this.hue;
    this.channelData[getColorChannelIndex(EColorSpace.HSV, EColorChannel.Saturation)] = this.saturation;
    this.channelData[getColorChannelIndex(EColorSpace.HSV, EColorChannel.Brightness)] = this.brightness;
    if (!this.validate()) {
      throw new Error('HSVColor: Invalid color');
    }
  }

  public to: (other: EColorSpace) => NullableBaseColor = (other) => {
    {
        if (other === EColorSpace.CMYK) {
          throw new NotImplementedError();
        } else if (other === EColorSpace.HSV) {
          return this;
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

  public static makeRGBfromCMYK (cyan: bigint, magenta: bigint, yellow: bigint, black: bigint, bitDepth: number): HSVColor {
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
    return new HSVColor(bitDepth, red, green, blue);
  }

  public toCMYKColor (): CMYKColor {
    if (this.isNull) {
      return new CMYKColor(this.bitDepth, null, null, null, null);
    } else {
      return CMYKColor.fromRGB(this.hue, this.saturation, this.brightness, this.bitDepth);
    }
  }

  public override validate (): boolean {
    return super.validate() &&
            (this.hue >= 0n && this.hue <= this.maxValue) &&
            (this.saturation >= 0n && this.saturation <= this.maxValue) &&
            (this.brightness >= 0n && this.brightness <= this.maxValue);
  }

  public xor (other: NullableBaseColor): NullableBaseColor {
    if (other === null || other === undefined) {
      throw new Error('HSVColor: Other cannot be null');
    }
    if (!(other instanceof HSVColor)) {
      throw new Error('HSVColor: Other must be a HSVColor');
    }
    if (other.bitDepth !== this.bitDepth) {
      throw new Error('HSVColor: Bit depth must be the same.');
    }
    const xorRed = this.hue ^ other.hue;
    const xorGreen = this.saturation ^ other.saturation;
    const xorBlue = this.brightness ^ other.brightness;
    return new HSVColor( this.bitDepth, xorRed, xorGreen, xorBlue);
  }

  public add (other: NullableBaseColor): NullableBaseColor {
    if (other === null || other === undefined) {
      throw new Error('HSVColor: Other cannot be null');
    }
    if (!(other instanceof HSVColor)) {
      throw new Error('HSVColor: Other must be a HSVColor');
    }
    if (other.bitDepth !== this.bitDepth) {
      throw new Error('HSVColor: Bit depth must be the same.');
    }
    const addRed = this.hue + other.hue;
    const addGreen = this.saturation + other.saturation;
    const addBlue = this.brightness + other.brightness;
    return new HSVColor(this.bitDepth, addRed, addGreen, addBlue);
  }

  public subtract (other: NullableBaseColor): NullableBaseColor {
    if (other === null || other === undefined) {
      throw new Error('HSVColor: Other cannot be null');
    }
    if (!(other instanceof HSVColor)) {
      throw new Error('HSVColor: Other must be a HSVColor');
    }

    if (other.bitDepth !== this.bitDepth) {
      throw new Error('HSVColor: Bit depth must be the same.');
    }
    const subtractRed = this.hue - other.hue;
    const subtractGreen = this.saturation - other.saturation;
    const subtractBlue = this.brightness - other.brightness;
    return new HSVColor( this.bitDepth, subtractRed, subtractGreen, subtractBlue);
  }

  public multiply (other: NullableBaseColor): NullableBaseColor {
    if (other === null || other === undefined) {
      throw new Error('HSVColor: Other cannot be null');
    }
    if (!(other instanceof HSVColor)) {
      throw new Error('HSVColor: Other must be a HSVColor');
    }

    if (other.bitDepth !== this.bitDepth) {
      throw new Error('HSVColor: Bit depth must be the same.');
    }
    const multiplyRed = this.hue * other.hue;
    const multiplyGreen = this.saturation * other.saturation;
    const multiplyBlue = this.brightness * other.brightness;
    return new HSVColor(this.bitDepth, multiplyRed, multiplyGreen, multiplyBlue);
  }

  public divide (other: NullableBaseColor): NullableBaseColor {
    if (other === null || other === undefined) {
      throw new Error('HSVColor: Other cannot be null');
    }
    if (!(other instanceof HSVColor)) {
      throw new Error('HSVColor: Other must be a HSVColor');
    }

    if (other.bitDepth !== this.bitDepth) {
      throw new Error('HSVColor: Bit depth must be the same.');
    }
    const divideRed = this.hue / other.hue;
    const divideGreen = this.saturation / other.saturation;
    const divideBlue = this.brightness / other.brightness;
    return new HSVColor(this.bitDepth, divideRed, divideGreen, divideBlue);
  }
}
