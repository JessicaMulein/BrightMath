import { bigMax } from "./bigMath";
import CMYKColor from "./cmykColor";
import RGBColor from "./rgbColor";

  export function convertRGBtoCMYK (red: bigint, green: bigint, blue: bigint, bitDepth: number): CMYKColor {
    /*
        RGB to CMYK conversion formula
        The R,G,B values are divided by 255 to change the range from 0..255 to 0..1:

        R' = R/255

        G' = G/255

        B' = B/255

        The black key (K) color is calculated from the red (R'), green (G') and blue (B') colors:

        K = 1-max(R', G', B')

        The cyan color (C) is calculated from the red (R') and black (K) colors:

        C = (1-R'-K) / (1-K)

        The magenta color (M) is calculated from the green (G') and black (K) colors:

        M = (1-G'-K) / (1-K)

        The yellow color (Y) is calculated from the blue (B') and black (K) colors:

        Y = (1-B'-K) / (1-K)
    */
    const bitMax = 2n ** BigInt(bitDepth) - 1n;
    const redPrime = red / bitMax;
    const greenPrime = green / bitMax;
    const bluePrime = blue / bitMax;
    // const max = Math.max(redPrime, greenPrime, bluePrime);
    const max = bigMax(bitMax, redPrime, greenPrime, bluePrime);
    const black = 1n - max;
    const cyan = (1n - redPrime - black) / (1n - black);
    const magenta = (1n - greenPrime - black) / (1n - black);
    const yellow = (1n - bluePrime - black) / (1n - black);
    return new CMYKColor(bitDepth, cyan, magenta, yellow, black);
  }

  export function convertCMYKtoRGB (cmykColor: CMYKColor): RGBColor {
    if (cmykColor.isNull) {
      return new RGBColor(cmykColor.bitDepth, null, null, null);
    } else {
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
    const bitMax = 2n ** BigInt(cmykColor.bitDepth) - 1n;
    const red = bitMax * (1n - cmykColor.cyan) * (1n - cmykColor.black);
    const green = bitMax * (1n - cmykColor.magenta) * (1n - cmykColor.black);
    const blue = bitMax * (1n - cmykColor.yellow) * (1n - cmykColor.black);
    return new RGBColor(cmykColor.bitDepth, red, green, blue);
  }
}