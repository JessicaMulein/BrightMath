/* A script converted this file to TypeScript. */
/* tslint:disable */
/*
 * decaffeinate suggestions:
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
let index;
import rgb from './rgb';
import RGBInt from './RGBInt';
import hsv from './hsv';
import Lab from './Lab';
import LCh from './LCh';

export default (index = {
  rgb: rgb,
  RGB: RGBInt,
  hsv: hsv,
  Lab: Lab,
  LCh: LCh,
  XYZ: require("./XYZ"),
  xyY: require("./xyY"),
  white: require("./white"),
  //gamut: require "./gamut"
  space: {
    rgb: require("./space/rgb"),
    lab: require("./space/lab")
  }
});

// create global index if in browser
if (typeof window !== 'undefined' && window !== null) {
  window.c0lor = index;
}
