import NullableBaseColor from './nullableBaseColor';
import { EColorChannel, EColorSpace } from './enumerations';


export interface IColorDTO {
    readonly sourceColorBase: EColorSpace;
    readonly bitDepth: number;
}

export interface IBaseColor extends IColorDTO {
    readonly sourceColorBase: EColorSpace;
    readonly bitDepth: number;
    readonly maxValue: bigint;
    readonly channelData: Array<bigint>;
    readonly isNull: boolean;
    getChannelData: (channel: EColorChannel) => bigint;
    getChannelType: (channelIndex: number) => EColorChannel;
    getChannelIndex: (channel: EColorChannel) => number;
    getChannelCount: () => number;
    to: (other: EColorSpace) => NullableBaseColor;
    xor: (other: NullableBaseColor) => NullableBaseColor
    add: (other: NullableBaseColor) => NullableBaseColor
    subtract: (other: NullableBaseColor) => NullableBaseColor
    multiply: (other: NullableBaseColor) => NullableBaseColor
    divide: (other: NullableBaseColor) => NullableBaseColor
  }

export interface IRGBColor extends IColorDTO {
    readonly red: bigint;
    readonly green: bigint;
    readonly blue: bigint;
}

export function isRGBColor(color: IColorDTO): color is IRGBColor {
    return (<IRGBColor>color).red !== undefined && (<IRGBColor>color).green !== undefined && (<IRGBColor>color).blue !== undefined;
}

export interface IRGBAColor extends IRGBColor {
    readonly alpha: bigint;
}

export function isRGBAColor(color: IColorDTO): color is IRGBAColor {
    return (<IRGBAColor>color).alpha !== undefined &&
              (<IRGBAColor>color).red !== undefined &&
                (<IRGBAColor>color).green !== undefined &&
                    (<IRGBAColor>color).blue !== undefined;
}

export interface IRGBShortColor extends IRGBColor {
    readonly r: bigint;
    readonly g: bigint;
    readonly b: bigint;
}

export function isRGBShortColor(color: IColorDTO): color is IRGBShortColor {
    return (<IRGBShortColor>color).r !== undefined && (<IRGBShortColor>color).g !== undefined && (<IRGBShortColor>color).b !== undefined;
}

export interface IRGBAShortColor extends IRGBShortColor {
    readonly a: bigint;
}

export function isRGBAShortColor(color: IColorDTO): color is IRGBAShortColor {
    return (<IRGBAShortColor>color).a !== undefined &&
              (<IRGBAShortColor>color).r !== undefined &&
                (<IRGBAShortColor>color).g !== undefined &&
                    (<IRGBAShortColor>color).b !== undefined;
}

export interface ICMYKColor extends IColorDTO {
    readonly cyan: bigint;
    readonly magenta: bigint;
    readonly yellow: bigint;
    readonly black: bigint;
}

export function isCMYKColor(color: IColorDTO): color is ICMYKColor {
    return (<ICMYKColor>color).cyan !== undefined &&
        (<ICMYKColor>color).magenta !== undefined &&
        (<ICMYKColor>color).yellow !== undefined &&
        (<ICMYKColor>color).black !== undefined;
}

export interface ICMYKShortColor extends ICMYKColor {
    readonly c: bigint;
    readonly m: bigint;
    readonly y: bigint;
    readonly k: bigint;
}

export function isCMYKShortColor(color: IColorDTO): color is ICMYKShortColor {
    return (<ICMYKShortColor>color).c !== undefined &&
        (<ICMYKShortColor>color).m !== undefined &&
        (<ICMYKShortColor>color).y !== undefined &&
        (<ICMYKShortColor>color).k !== undefined;
}

export interface IHSVColor extends IColorDTO {
    readonly hue: bigint;
    readonly saturation: bigint;
    readonly brightness: bigint;
}

export function isHSVColor(color: IColorDTO): color is IHSVColor {
    return (<IHSVColor>color).hue !== undefined &&
        (<IHSVColor>color).saturation !== undefined &&
        (<IHSVColor>color).brightness !== undefined;
}

export interface IHSVShortColor extends IHSVColor {
    readonly h: bigint;
    readonly s: bigint;
    readonly v: bigint;
}

export function isHSVShortColor(color: IColorDTO): color is IHSVShortColor {
    return (<IHSVShortColor>color).h !== undefined &&
        (<IHSVShortColor>color).s !== undefined &&
        (<IHSVShortColor>color).v !== undefined;
}