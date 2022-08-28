import CMYKColor from './cmykColor';
import RGBAColor from './rgbaColor';
import RGBColor from './rgbColor';

describe('NullableBaseColor', () => {
  it('should create the CMYK color', () => {
    const bitDepth = 8;
    const maxVal = 2n * BigInt(bitDepth) - 1n;
    const cyan = BigInt(Math.random()) * maxVal;
    const yellow = BigInt(Math.random()) * maxVal;
    const magenta = BigInt(Math.random()) * maxVal;
    const black = BigInt(Math.random()) * maxVal;
    const cmykColor = new CMYKColor(bitDepth, cyan, magenta, yellow, black);
    expect(cmykColor).toBeInstanceOf(CMYKColor);
    expect(cmykColor.cyan).toBe(cyan);
    expect(cmykColor.magenta).toBe(magenta);
    expect(cmykColor.yellow).toBe(yellow);
    expect(cmykColor.black).toBe(black);
  });
  it('should create the RGBA color', () => {
    const bitDepth = 8;
    const maxVal = 2n * BigInt(bitDepth) - 1n;
    const red = BigInt(Math.random()) * maxVal;
    const green = BigInt(Math.random()) * maxVal;
    const blue = BigInt(Math.random()) * maxVal;
    const alpha = BigInt(Math.random()) * maxVal;
    const cmykColor = new RGBAColor(bitDepth, red, green, blue, alpha);
    expect(cmykColor).toBeInstanceOf(RGBAColor);
    expect(cmykColor.red).toBe(red);
    expect(cmykColor.green).toBe(green);
    expect(cmykColor.blue).toBe(blue);
    expect(cmykColor.alpha).toBe(alpha);
  });
  it('should create the RGB color', () => {
    const bitDepth = 8;
    const maxVal = 2n * BigInt(bitDepth) - 1n;
    const red = BigInt(Math.random()) * maxVal;
    const green = BigInt(Math.random()) * maxVal;
    const blue = BigInt(Math.random()) * maxVal;
    const cmykColor = new RGBColor(bitDepth, red, green, blue);
    expect(cmykColor).toBeInstanceOf(RGBColor);
    expect(cmykColor.red).toBe(red);
    expect(cmykColor.green).toBe(green);
    expect(cmykColor.blue).toBe(blue);
  });
});
