/* A script converted this file to TypeScript. */
/* tslint:disable */
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
import O from "ut1l/create/object";
import Lab from "./Lab";

const {
  cos
} = Math;
const {
  sin
} = Math;

// LCh color prototype
// -------------------

const lchPrototype = {

  // Converts color from LCh to Lab color space.
  Lab(T) {
    if (T == null) { T = Lab(); }
    T.L = this.L;
    T.a = this.C * cos(this.h);
    T.b = this.C * sin(this.h);
    return T;
  },

  // Returns a human readable string serialization of the color.
  toString() {
    return `L=${this.L}, C=${this.C}, h=${this.h}`;
  }
};


// Public API
// ----------

export default O((function(L, C, h) {
  this.L = L;
  this.C = C;
  this.h = h;
  }), lchPrototype);
