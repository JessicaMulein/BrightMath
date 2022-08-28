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
import LCh from "./LCh";

const {
  sqrt
} = Math;
const {
  atan2
} = Math;


// Lab color prototype
// -------------------

const labPrototype = {

  // Converts color from Lab to LCh color space.
  LCh(T) {
    if (T == null) { T = LCh(); }
    T.L = this.L; // lightness
    T.C = sqrt((this.a * this.a) + (this.b * this.b)); // chroma
    T.h = atan2(this.b, this.a); // hue
    return T;
  },

  // Returns a human readable string serialization of the color.
  toString() {
    return `L=${this.L}, a=${this.a}, b=${this.b}`;
  }
};



// Public API
// ----------

export default O((function(L, a, b) {
  this.L = L;
  this.a = a;
  this.b = b;
  }), labPrototype);
