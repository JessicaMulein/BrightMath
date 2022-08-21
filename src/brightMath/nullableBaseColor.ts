import CMYKColor from './cmykColor';
import IBaseColor from './iBaseColor';
import { EColorSource } from './enumerations';
import RGBColor from './rgbColor';
import BaseColorDataTransferObject from './baseColorDTO';
import { colorChannelCountMap } from './maps';
import RGBAColor from './rgbaColor';

export default abstract class NullableBaseColor implements IBaseColor {
  public readonly sourceColorBase: EColorSource;
  public readonly channelData: Array<bigint>;
  public readonly bitDepth: number;
  public readonly maxValue: bigint;
  public readonly isNull: boolean;
  public validate (): boolean {
    return this.validateBitDepth();
  }

  private validateBitDepth (): boolean {
    // currently only 8 bit/256 color depth is supported
    return (this.bitDepth === 8);
  }

  public constructor (sourceColorBase: EColorSource, bitDepth: number, isNull: boolean) {
    this.isNull = isNull;
    this.sourceColorBase = sourceColorBase;
    this.maxValue = 2n ** BigInt(bitDepth) - 1n;
    this.bitDepth = bitDepth;
    if (!this.validateBitDepth()) {
      throw new Error('Invalid bit depth');
    }
    
    this.channelData = new Array<bigint>();
    const channelCount = isNull ? 0 : colorChannelCountMap.get(sourceColorBase);
    if (channelCount === undefined) {
        throw new Error('Unknown color base');
    }
    for (let i = 0; i < channelCount; i++) {
        this.channelData.push(0n);
    }
  }

  public static fromObject (value: BaseColorDataTransferObject): RGBColor | RGBAColor | CMYKColor {
    if (value.red !== undefined && value.green !== undefined && value.blue !== undefined && value.alpha === undefined) {
        return new RGBColor(value.bitDepth, value.red, value.green, value.blue);
    } else if (value.red !== undefined && value.green !== undefined && value.blue !== undefined && value.alpha !== undefined) {
        return new RGBAColor(value.bitDepth, value.red, value.green, value.blue, value.alpha);
    } else if (value.cyan !== undefined && value.magenta !== undefined && value.yellow !== undefined && value.black !== undefined) {
        return new CMYKColor(value.bitDepth, value.cyan, value.magenta, value.yellow, value.black);
    } else {
        throw new Error('Invalid color base');
    }
  }

  public toObject (): BaseColorDataTransferObject {
    if (this instanceof RGBColor) {
      return new BaseColorDataTransferObject(
        this.bitDepth,
        this.red,
        this.green,
        this.blue,
        undefined /* cyan */,
        undefined /* magenta */,
        undefined /* yellow */,
        undefined /* black */,
        undefined /* alpha */);
    } else if (this instanceof RGBAColor) {
      return new BaseColorDataTransferObject(
        this.bitDepth,
        this.red,
        this.green,
        this.blue,
        undefined /* cyan */,
        undefined /* magenta */,
        undefined /* yellow */,
        undefined /* black */,
        this.alpha);
    } else if (this instanceof CMYKColor) {
      return new BaseColorDataTransferObject(
        this.bitDepth,
        undefined /* red */,
        undefined /* green */,
        undefined /* blue */,
        this.cyan,
        this.magenta,
        this.yellow,
        this.black,
        undefined /* alpha */);
    } else {
      throw new Error('Invalid color base');
    }
  }

  protected static boundValue (value: bigint, maxValue: bigint): bigint {
    const lowerBounded = 0n > value ? 0n : value;
    const upperBounded = maxValue < lowerBounded ? maxValue : lowerBounded;
    return upperBounded;
  }

  public abstract xor (other: NullableBaseColor): NullableBaseColor;

  public abstract add (other: NullableBaseColor): NullableBaseColor;

  public abstract subtract (other: NullableBaseColor): NullableBaseColor;

  public abstract multiply (other: NullableBaseColor): NullableBaseColor;

  public abstract divide (other: NullableBaseColor): NullableBaseColor;
}
