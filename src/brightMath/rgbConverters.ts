import { ELabWhitePoint, ERGBColorSpace } from "./enumerations";
import RGBAColor from "./rgbaColor";
import RGBColor from "./rgbColor";
import { RGBColorSpace } from "./rgbColorSpace";
import xyY from "./xyY";

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
  }
  
export function gammaSRgbInv(x: number) {
    if (x <= 0.0031308) {
      return x * 12.92;
    } else {
      return (1.055 * (Math.pow(x, 1 / 2.4))) - 0.055;
    }
  }

/*    
createSpace["Adobe-98"] = createSpace((xyY(0.6400, 0.3300)), (xyY(0.2100, 0.7100)), (xyY(0.1500, 0.0600)), white.D65, 2.2);
createSpace["Adobe-RGB"] = createSpace((xyY(0.6250, 0.3400)), (xyY(0.2800, 0.5950)), (xyY(0.1550, 0.0700)), white.D65, 1.8);
createSpace["CIE-RGB"] =   createSpace((xyY(0.7350, 0.2650)), (xyY(0.2740, 0.7170)), (xyY(0.1670, 0.0090)), white.E  , 1);
createSpace["ColorMatch"] =   createSpace((xyY(0.6300, 0.3400)), (xyY(0.2950, 0.6050)), (xyY(0.1500, 0.0750)), white.D50, 1.8);
createSpace["EBU-Monitor"] =  createSpace((xyY(0.6314, 0.3391)), (xyY(0.2809, 0.5971)), (xyY(0.1487, 0.0645)), white.D50, 1.9);
createSpace["ECI-RGB"] =   createSpace((xyY(0.6700, 0.3300)), (xyY(0.2100, 0.7100)), (xyY(0.1400, 0.0800)), white.D50, 1.8);
createSpace["HDTV"] =      createSpace((xyY(0.6400, 0.3300)), (xyY(0.2900, 0.6000)), (xyY(0.1500, 0.0600)), white.D65, 2.2);
createSpace["Kodak-DC"] =  createSpace((xyY(0.6492, 0.3314)), (xyY(0.3219, 0.5997)), (xyY(0.1548, 0.0646)), white.D50, 2.22);
createSpace["NTSC-53"] =   createSpace((xyY(0.6700, 0.3300)), (xyY(0.2100, 0.7100)), (xyY(0.1400, 0.0800)), white.C  , 2.2);
createSpace["PAL-SECAM"] = createSpace((xyY(0.6400, 0.3300)), (xyY(0.2900, 0.6000)), (xyY(0.1500, 0.0600)), white.D65, 2.2);
createSpace["sRGB"] =      createSpace((xyY(0.6400, 0.3300)), (xyY(0.3000, 0.6000)), (xyY(0.1500, 0.0600)), white.D65, gammaSRgb,  gammaSRgbInv);
createSpace["WideGamut"] = createSpace((xyY(0.7347, 0.2653)), (xyY(0.1152, 0.8264)), (xyY(0.1566, 0.0177)), white.D50, 2.2);
*/

const adobe98 = new RGBColorSpace((new xyY(0.6400, 0.3300)), (xyY(0.2100, 0.7100)), (xyY(0.1500, 0.0600)), ELabWhitePoint.D65, 2.2);