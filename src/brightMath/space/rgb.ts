/* A script converted this file to TypeScript. */
/* tslint:disable */
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
// Imports / Shortcuts
// -------------------


import O from "ut1l/create/object";


import M from "m4th/matrix";
import lu from "m4th/lu";

import rgb from "../rgb";
import white from "../white";
import xyY from "../xyY";

import XYZ from "../XYZ";

const {
  pow
} = Math;

// Helpers
// -------


const gammaSRgb = function(x) {
  if (x <= 0.04045) {
    return x / 12.92;
  } else {
    return pow((x + 0.055) / 1.055, 2.4);
  }
};

const gammaSRgbInv = function(x) {
  if (x <= 0.0031308) {
    return x * 12.92;
  } else {
    return (1.055 * (pow(x, 1 / 2.4))) - 0.055;
  }
};


// RGB space constructor
// ---------------------

const lazyInitRgbBase = function() {
  // create xyz base (luminance is unknown => need to multiply each column by a scalar)
  let bxyz = M([
    this.red.x         ,     this.green.x           ,     this.blue.x,
    this.red.y,                this.green.y,               this.blue.y,
    1 - this.red.x - this.red.y, 1 - this.green.x - this.green.y, 1 - this.blue.x - this.blue.y
  ]);
  // calculate LU decomposition of xyz base
  const bxyzLU = lu(bxyz);
  const w = M(3, [ this.white.X, this.white.Y, this.white.Z ]);
  // get the needed scales or the columns of bxyz (sum of the columns of the base must be the white point)
  bxyzLU.solve(w, w); // calculate in place
  // scale bxyz to get the wanted XYZ base (sum of columns is white point)
  bxyz = bxyz.mult(M.diag(w.array));
  this.base = bxyz.array;
  this.baseInv = (lu(bxyz)).getInverse().array;

  delete this.XYZ;
  delete this.rgb;
};

const rgbSpaceConstructor = function(red, green, blue, white1, gamma, gammaInv) {
  this.red = red;
  this.green = green;
  this.blue = blue;
  this.white = white1;
  if (typeof gamma === "function") {
    this.gamma = gamma;
    this.gammaInv = gammaInv;
  } else {
    this.g = gamma;
    this.gInv = 1 / gamma;
  }
  // Lazy definition of following two methods.
  this.rgb = function() {
    lazyInitRgbBase.call(this);
    return this.rgb.apply(this, arguments);
  };
  this.XYZ = function() {
    lazyInitRgbBase.call(this);
    return this.XYZ.apply(this, arguments);
  };
};



// RGB space prototype
// -------------------

const rgbSpacePrototype = {


  gamma(x) {
    return pow(x, this.g);
  },

  gammaInv(x) {
    return pow(x, this.gInv);
  },

  rgb(XYZ, T) {
    if (T == null) { T = rgb(); }
    const a = this.baseInv;
    T.r = this.gammaInv((a[0] * XYZ.X) + (a[1] * XYZ.Y) + (a[2] * XYZ.Z));
    T.g = this.gammaInv((a[3] * XYZ.X) + (a[4] * XYZ.Y) + (a[5] * XYZ.Z));
    T.b = this.gammaInv((a[6] * XYZ.X) + (a[7] * XYZ.Y) + (a[8] * XYZ.Z));
    return T;
  },

  XYZ(Rgb, T) {
    if (T == null) { T = XYZ(); }
    const a = this.base;
    const gr = this.gamma(Rgb.r);
    const gg = this.gamma(Rgb.g);
    const gb = this.gamma(Rgb.b);
    T.X = (a[0] * gr) + (a[1] * gg) + (a[2] * gb);
    T.Y = (a[3] * gr) + (a[4] * gg) + (a[5] * gb);
    T.Z = (a[6] * gr) + (a[7] * gg) + (a[8] * gb);
    return T;
  }
};







// Public api
// ----------



const createSpace = O(rgbSpaceConstructor, rgbSpacePrototype);

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


export default createSpace;
