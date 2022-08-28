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
import RGBInt from "./RGBInt";

const {
  round
} = Math;

// Helpers
// -------


const toByte = function(d) {
  if (d != null) { return round(d * 255); }
};

const validRgbEl = x => (isFinite(x)) && (0 <= x && x <= 1);

// RGB prototype
// -------------

const rgbPrototype = {

  RGB(T) {
    if (T == null) { T = RGBInt(); }
    T.R = toByte(this.r);
    T.G = toByte(this.g);
    T.B = toByte(this.b);
    return T;
  },

  set(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
    return this;
  },

  isDefined() {
    return (this.r != null) && (this.g != null) && (this.b != null);
  },

  isValid() {
    return (this.isDefined)() && (validRgbEl(this.r)) && (validRgbEl(this.g)) && (validRgbEl(this.b));
  },

  toString() {
    return `r=${this.r}, g=${this.g}, b=${this.b}`;
  }
};



// Public api
// ----------

export default O(({extendRgb(f) { return f(rgbPrototype); }}), (function(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;
  }), rgbPrototype);
