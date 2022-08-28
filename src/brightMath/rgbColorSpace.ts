import { ELabWhitePoint, ERGBColorSpace } from "./enumerations";
import xyY from "./xyY";

export class RGBColorSpace {
    public readonly colorSpace: ERGBColorSpace | null;
    public readonly whitePoint: ELabWhitePoint | null;
    public readonly gamma: number | null;
    public readonly gammaFunction: ((f: number) => number) | null;
    public readonly gammaInv: number | null;
    public readonly gammaInvFunction: ((f: number) => number) | null;
    public readonly red: xyY;
    public readonly green: xyY;
    public readonly blue: xyY;

    public constructor(red: xyY, green: xyY, blue: xyY, colorSpace: ERGBColorSpace, whitePoint: ELabWhitePoint, gamma: number | null | ((f: number) => number) = null, gammaInv: number | ((f: number) => number) | null = null) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.colorSpace = colorSpace;
        this.whitePoint = whitePoint;
        if (gamma === null) {
            this.gamma = null;
            this.gammaFunction = null;
          } else if (gamma !== null && (gamma instanceof Function)) {
            this.gamma = null;
            this.gammaFunction = gamma;
          } else {
            this.gamma = gamma;
            this.gammaFunction = null;
          }
          if (gammaInv === null) {
            this.gammaInv = null;
            this.gammaInvFunction = null;
          } else if (gammaInv !== null && (gammaInv instanceof Function)) {
            this.gammaInv = null;
            this.gammaInvFunction = gammaInv;
          } else {
            this.gammaInv = gammaInv;
            this.gammaInvFunction = null;
          }
    }
}