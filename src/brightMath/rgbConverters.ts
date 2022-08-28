import RGBAColor from "./rgbaColor";

 export function convertCMYKtoRGB (cyan: bigint, magenta: bigint, yellow: bigint, black: bigint, newRGBAlpha: bigint, bitDepth: number): RGBAColor {
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
    return new RGBAColor(bitDepth, red, green, blue, newRGBAlpha);
  }

  // Helpers
// -------


export function gammaSRgb(x: number) {
    if (x <= 0.04045) {
      return x / 12.92;
    } else {
      return Math.pow((x + 0.055) / 1.055, 2.4);
    }
  };
  
export function gammaSRgbInv(x: number) {
    if (x <= 0.0031308) {
      return x * 12.92;
    } else {
      return (1.055 * (Math.pow(x, 1 / 2.4))) - 0.055;
    }
  };
  