import { ELabWhitePoint } from "./enumerations";
import xyY from "./xyY";

// Create *XYZ* color with luminance *1* from chromaticity.
const labWhitePointFactory: Map<ELabWhitePoint, xyY> = new Map<ELabWhitePoint, xyY>([
    [ELabWhitePoint.A, new xyY(0.44757, 0.40745, 1)],
    [ELabWhitePoint.B, new xyY(0.34842, 0.35161, 1)],
    [ELabWhitePoint.C, new xyY(0.31006, 0.31616, 1)],
    [ELabWhitePoint.D50, new xyY(0.34567, 0.35850, 1)],
    [ELabWhitePoint.D55, new xyY(0.33242, 0.34743, 1)],
    [ELabWhitePoint.D65, new xyY(0.31271, 0.32902, 1)],
    [ELabWhitePoint.D75, new xyY(0.29902, 0.31485, 1)],
    [ELabWhitePoint.E, new xyY(1 / 3, 1 / 3, 1)],
    [ELabWhitePoint.F1, new xyY(0.31310, 0.33727, 1)],
    [ELabWhitePoint.F2, new xyY(0.37208, 0.37529, 1)],
    [ELabWhitePoint.F3, new xyY(0.40910, 0.39430, 1)],
    [ELabWhitePoint.F4, new xyY(0.44018, 0.40329, 1)],
    [ELabWhitePoint.F5, new xyY(0.31379, 0.34531, 1)],
    [ELabWhitePoint.F6, new xyY(0.37790, 0.38835, 1)],
    [ELabWhitePoint.F7, new xyY(0.31292, 0.32933, 1)],
    [ELabWhitePoint.F8, new xyY(0.34588, 0.35875, 1)],
    [ELabWhitePoint.F9, new xyY(0.37417, 0.37281, 1)],
    [ELabWhitePoint.F10, new xyY(0.34609, 0.35986, 1)],
    [ELabWhitePoint.F11, new xyY(0.38052, 0.37713, 1)],
    [ELabWhitePoint.F12, new xyY(0.43695, 0.40441, 1)]
]);

export default labWhitePointFactory;