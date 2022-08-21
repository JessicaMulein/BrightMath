import NullableBaseColor from './nullableBaseColor';
import { EColorSource } from './enumerations';

export default interface IBaseColor {
  readonly sourceColorBase: EColorSource | null;
  readonly channelData: Array<bigint>;
  readonly bitDepth: number
  readonly maxValue: bigint;
  xor: (other: NullableBaseColor) => NullableBaseColor
  add: (other: NullableBaseColor) => NullableBaseColor
  subtract: (other: NullableBaseColor) => NullableBaseColor
  multiply: (other: NullableBaseColor) => NullableBaseColor
  divide: (other: NullableBaseColor) => NullableBaseColor
}
