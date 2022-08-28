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

import XYZ from "./XYZ";

// xyY prototype
// -------------

class xyY{
  public readonly x: number;
  public readonly y: number;
  public readonly Y: number;

  constructor(x: number, y: number, Y: number) {
    this.x = x;
    this.y = y;
    this.Y = Y;
    }
    
// Convert color from *xyY* to *XYZ* color space. Give optional *XYZ* color `T` to store the result.
  XYZ(): XYZ {
    return new XYZ((this.x * this.Y) / this.y,this.Y, ((1 - this.x - this.y) * this.Y) / this.y);
  }

// Returns `true` if all components of the color are not `null` and not `undefined`.
  isDefined() {
    return (this.x != null) && (this.y != null) && (this.Y != null);
  }

// Returns a human readable string serialization of the color.
  toString() {
    return `x=${this.x}, y=${this.y}, Y=${this.Y}`;
  }
}




// Public API
// ----------

export default xyY;
