/* A script converted this file to TypeScript. */
/* tslint:disable */
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */


import O from "ut1l/create/object";
import rgb from "./rgb";


const fromByte = function(b) {
  if (b === undefined) { return b; } else { return b / 255; }
};

const to2Hex = function(b) {
  const hex = ((b.toString(16)).toUpperCase)();
  if (hex.length === 1) { return "0" + hex; } else { return hex; }
};

const from2Hex = str => parseInt(str, 16);

const isValid = n => (0 <= n && n <= 255) && ((n % 1) === 0);

// RGB 24 bit prototype
// --------------------

const rgb24Prototype = {

  rgb(T) {
    if (T == null) { T = rgb(); }
    T.r = fromByte(this.R);
    T.g = fromByte(this.G);
    T.b = fromByte(this.B);
    return T;
  },

  hex(str) {
    if (str != null) {
      this.R = from2Hex(str.substring(0, 2));
      this.G = from2Hex(str.substring(2, 4));
      this.B = from2Hex(str.substring(4, 6));
      return this;
    } else {
      if ((this.isDefined)()) { return (to2Hex(this.R)) + (to2Hex(this.G)) + (to2Hex(this.B)); } else { return undefined; }
    }
  },

  isDefined() {
    return (this.R != null) && (this.G != null) && (this.B != null);
  },

  isValid() {
    return this.isDefined() && (isValid(this.R)) && (isValid(this.G)) && (isValid(this.B));
  },

  toString() {
    return `R=${this.R}, G=${this.G}, B=${this.B}`;
  }
};



// Public api
// ----------

export default O((function(R, G, B) {
  this.R = R;
  this.G = G;
  this.B = B;
  }), rgb24Prototype);
