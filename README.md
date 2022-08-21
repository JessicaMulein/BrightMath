# BrightMath
## An Experiment: Math in Color

What if we built a math around colors from another perspective?

### What is a Color?
First lets define a Color in the context of BrightMath:

* Additive light (projected, LED, CRT, etc) is typically composed of Red, Green, and Blue (RGB).
  * When combined with each channel at full intensity, the result will be composed of all colors- white.
  * Black is the projection of no light. Any subtractive operation will never go below nothing.

* Subtractive light (pigments, toner, etc) is typically composed of Cyan, Magenta, Yellow, and blacK (CMYK).
  * They used the last letter of blacK so as not to be confused with Blue from RGB.
  * Each pigment blocks all light except the color. Black pigment blocks all other colors. Lighter pigments block less light of the various components.

* Additive light can be mitigated by subtractive light, but at the moment BrightMath will not approach this.
  * A BrightMath Color is either a CMYK Color, an RGB Color, or an RGBA color. (HSV planned)
  * While there are quick conversion functions between them, for now, a Color can only be used directly with another Color of the same type.

## Representing colors in computers
* Computers usually think in terms of RGB light when thinking about displays, or CMYK pigments when thinking about printing.
* Computers keep track of the components using the concept of Channels.
* In addition to the Red, Green, Blue or Cyan, Magenta, Yellow, Black channels, we often will add a transparency value, called Alpha.
  * The Alpha channel is an additional coefficient used when layering.
    * For instance Royal Blue with an Alpha of 75% will be 25% dimmer.(?)
  * BrightMath will include an RGBA type with Alpha (transparency) channel for future use.
  * Each BrightMath Color type has either three (RGB), four (CYMK), or five (RGBA) channels.
* Brightness for each channel is typically stored as an integer.
  * Over the years, depending on the platform and many other factors, computers have used different byte widths and methods to store these values.
  * Be careful of the difference between bit per channel and bit per pixel.
    * 1 bit per pixel is monochromatic- Zero intensity or Full intensity.
      * It was likely projected as amber, green or light grey in the earlier years, but is thought of as Black and White.
    * 1 bit per channel when using RGB means there are three channels each with one bit/intensity.
    * 1 bit per channel when using CMYK means there are four channels each with one bit/intensity.
    * 8-bit RGB yields 256*256*256 = 16,777,216 (approximately 16 Million) Colors.
       * 256 values because it is 0 through and including 255.
        * Referred to as SVGA or 24-bit color because the total bits used for all three channels is 24. (3*8)
  * Although the values for each channel appear to be numbers from say 0 to 255, they can also be thought of as fixed point numbers from 0 to 1 as a percentage of full intensity.
  * Any number of Colors of the same type can be operated (standard math +, -, *,/ as well as boolean ^, &, |) on.
    * Each channel will combine in standard math operators and cap at the limit.


## References
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
* https://www.cambridgeincolour.com/tutorials/bit-depth.htm

## Set Theory
[Von Neumann Ordinals](https://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers)
* Null is the empty set { } or Φ/∅/Phi
* In Zermelo–Fraenkel (ZF) set theory, the natural numbers are defined recursively by letting 0 = {} be the empty set and n + 1 = n ∪ {n} for each n.# BrightMath

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
