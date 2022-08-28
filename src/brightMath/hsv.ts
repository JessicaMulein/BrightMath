/* A script converted this file to TypeScript. */
/* tslint:disable */
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
// see: http://en.wikipedia.org/wiki/HSL_and_HSV

// Imports / Shortcuts
// -------------------

let createHsv;
import O from "ut1l/create/object";
import rgb from "./rgb";

const {
  floor
} = Math;


// HSV color prototype
// -------------------

const hsvPrototype = {

  rgb(T) {
    if (T == null) { T = rgb(); }
    if (this.s === 0) { // simplification
      return T.set(this.v, this.v, this.v);
    } else {
      const h = (this.h - floor(this.h)) * 6;  // 0 <= h < 6
      const f = h - floor(h);          // 0 <= f < 1
      const p = this.v * (1 - this.s);
      const q = this.v * (1 - (this.s * f));
      const t = this.v * (1 - (this.s * (1 - f)));
      switch (floor(h)) {
        case 0: return T.set(this.v,  t,  p);
        case 1: return T.set(q, this.v,  p);
        case 2: return T.set(p, this.v,  t);
        case 3: return T.set(p,  q, this.v);
        case 4: return T.set(t,  p, this.v);
        case 5: return T.set(this.v,  p,  q);
      }
    }
  },

  set(h, s, v) {
    this.h = h;
    this.s = s;
    this.v = v;
    return this;
  },

  toString() {
    return `h=${this.h}, s=${this.s}, v=${this.v}`;
  }
};


// Extend RGB module
// -----------------

const hsv = (createHsv = O((function(h, s, v) {
  this.h = h;
  this.s = s;
  this.v = v;
  }), hsvPrototype));

rgb.extendRgb(rgb => rgb.hsv = function(T) {
  if (T == null) { T = createHsv(); }
  const max = Math.max(this.r, this.g, this.b);
  const min = Math.min(this.r, this.g, this.b);
  T.v = max;
  const d = max - min;
  T.s = max !== 0 ? d / max : 0;
  if (T.s === 0) {
    T.h = 0;
  } else {
    switch (max) {
      case this.r:
        T.h = this.g < this.b ? 6 : 0;
        T.h += (this.g - this.b) / d;
        break;
      case this.g:
        T.h = 2 + ((this.b - this.r) / d);
        break;
      default: // blue
        T.h = 4 + ((this.r - this.g) / d);
    }
    T.h /= 6;
  }
  return T;
});



// Public API
// ----------

export default hsv;
