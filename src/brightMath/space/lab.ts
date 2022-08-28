/* A script converted this file to TypeScript. */
/* tslint:disable */
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */

import xyz from "../XYZ";
import Lab from "../Lab";
import xyY from "../xyY";
import { ELabWhitePoint } from "../enumerations";
import { labWhitePointMap } from "../maps";
import XYZ from "../XYZ";

const {
  pow
} = Math;

// Helpers
// -------

const N = 4 / 29; // = 16 / 116
const e3 = 216 / 24389; // = e^3
const foo = 841 / 108;  // = (1 / 116) * (24389 / 27) = 1/3 * (29/6)^2
const e = 6 / 29; // = e3^(1/3)

const f = function(w: number): number {
  if (w > e3) {
    return pow(w, 1/3);
  } else {
    return (foo * w) + N;
  }
};

const fInv = function(w: number): number {
  if (w > e) {
    return pow(w, 3);
  } else {
    return (w - N) / foo;
  }
};

// Derivative of `f`.
const fDeriv = function(w: number): number {
  if (w > e3) {
    return 1 / (3 * (pow(w, 2/3)));
  } else {
    return foo;
  }
};

// Lab color space prototype
// -------------------------

class labSpace {
  public readonly white: XYZ;

  constructor(white: ELabWhitePoint) {
    if (!labWhitePointMap.has(white)) {
      throw new Error(`Invalid white point: ${white}`);
    }
    const w = labWhitePointMap.get(white);
    if (w === undefined || w === null) {
      throw new Error(`Invalid white point: ${white}`);
    }
    this.white = w.XYZ();
  }

// Converts color `XYZ` from *XYZ* to this *Lab* color space.
  Lab(XYZ: { Y: number; X: number; Z: number; }): labSpace {
    const l = f(XYZ.Y / this.white.Y);
    const L = (116 * l) - 16;
    const a = 500 * ((f(XYZ.X / this.white.X)) - l);
    const b = 200 * (l - (f(XYZ.Z / this.white.Z)));
    return T;
  }

  XYZ(Lab: { L: number; a: number; b: number; }) {
    const fy = (Lab.L + 16) / 116;
    const X = (fInv(fy + (Lab.a / 500))) * this.white.X;
    const Y = (fInv(fy)) * this.white.Y;
    const Z = (fInv(fy - (Lab.b / 200))) * this.white.Z;
    return T;
  }

  LabderivL(Y: number) {
    return (116 * (fDeriv(Y / this.white.Y))) / this.white.Y;
  }
}

// Public API
// ----------

export default labSpace;