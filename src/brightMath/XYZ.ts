/* A script converted this file to TypeScript. */
/* tslint:disable */
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
// XYZ and xyY color space implementation.

// Imports
// -------

import xyY from "./xyY";

// XYZ prototype
// -------------

class xyz {
  public readonly X: number;
  public readonly Y: number;
  public readonly Z: number;

  constructor(X:number, Y: number, Z: number) {
    this.X = X;
    this.Y = Y;
    this.Z = Z;
  }
  // Convert the color from *XYZ* to *xyY* color space. Give optional *xyY* color `T` to store the result.
  xyY():xyY {
    return new xyY(this.X / (this.X + this.Y + this.Z), this.Y / (this.X + this.Y + this.Z), this.Y);
  }

  // Returns `true` if all components of the color are not `null` and not `undefined`.
  isDefined(): boolean {
    return (this.X != null) && (this.Y != null) && (this.Z != null);
  }

  // Returns a human readable string serialization of the color.
  toString(): string {
    return `X=${this.X}, Y=${this.Y}, Z=${this.Z}`;
  }
}




// Public API
// ----------

export default xyz;
