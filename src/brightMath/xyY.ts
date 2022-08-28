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
import { Matrix, LuDecomposition, inverse } from "ml-matrix";

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

  public static matrixOp(red: xyY, green: xyY, blue: xyY, white: XYZ): any {
    const bxyz: Matrix = new Matrix([
      [red.x         ,     green.x          ,     blue.x],
      [red.y,                green.y,               blue.y],
      [1 - red.x - red.y, 1 - green.x - green.y, 1 - blue.x - blue.y]
    ]);
    // calculate LU decomposition of xyz base
    const bxyzLU = new LuDecomposition(bxyz);
    const w = new Matrix([[ white.X, white.Y, white.Z ]]);
    // get the needed scales or the columns of bxyz (sum of the columns of the base must be the white point)
    const wSolved = bxyzLU.solve(w); // calculate in place
    // scale bxyz to get the wanted XYZ base (sum of columns is white point)
    const wMulResult = bxyz.mul(new Matrix([wSolved.diag()]));
    const base = wMulResult.to1DArray();
    const baseInv = inverse((bxyzLU);
    this.base = bxyz.array;
    this.baseInv = (lu(bxyz)).getInverse().array;
  }
}




// Public API
// ----------

export default xyY;
