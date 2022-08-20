import CMYKColor from './cmykColor';
import { EColorSource } from './enumerations';
import RGBColor from './rgbColor';

export default class ApproximatedColorPair {
  public readonly sourceColorBase: EColorSource;
  public readonly cmyk: CMYKColor;
  public readonly rgb: RGBColor;
  public readonly bitDepth: number;

  public constructor (sourceColor: CMYKColor | RGBColor) {
    if (sourceColor instanceof CMYKColor) {
      this.sourceColorBase = EColorSource.CMYK;
      this.cmyk = sourceColor;
      this.rgb = sourceColor.toRGBColor();
    } else if (sourceColor instanceof RGBColor) {
      this.sourceColorBase = EColorSource.RGB;
      this.cmyk = sourceColor.toCMYKColor();
      this.rgb = sourceColor;
    } else {
      throw new Error('Invalid color');
    }
    this.bitDepth = sourceColor.bitDepth;
    if (!this.validate()) {
      throw new Error('Invalid color');
    }
  }

  public validate (): boolean {
    return this.cmyk.validate() && this.rgb.validate();
  }
}
