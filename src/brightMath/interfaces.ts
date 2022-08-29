import NullableBaseColor from './nullableBaseColor';
import { EColorChannel, EColorSpace } from './enumerations';


export interface IColorDTO {
    readonly sourceColorBase: EColorSpace;
}

export interface IBaseColor extends IColorDTO {
    readonly sourceColorBase: EColorSpace;
    readonly channelData: Array<number>;
    readonly isNull: boolean;
    getChannelData: (channel: EColorChannel) => number;
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
    readonly red: number;
    readonly green: number;
    readonly blue: number;
}

export function isRGBColor(color: IColorDTO): color is IRGBColor {
    return (<IRGBColor>color).red !== undefined && (<IRGBColor>color).green !== undefined && (<IRGBColor>color).blue !== undefined;
}

export interface IRGBAColor extends IRGBColor {
    readonly alpha: number;
}

export function isRGBAColor(color: IColorDTO): color is IRGBAColor {
    return (<IRGBAColor>color).alpha !== undefined &&
              (<IRGBAColor>color).red !== undefined &&
                (<IRGBAColor>color).green !== undefined &&
                    (<IRGBAColor>color).blue !== undefined;
}

export interface IRGBShortColor extends IRGBColor {
    readonly r: number;
    readonly g: number;
    readonly b: number;
}

export function isRGBShortColor(color: IColorDTO): color is IRGBShortColor {
    return (<IRGBShortColor>color).r !== undefined && (<IRGBShortColor>color).g !== undefined && (<IRGBShortColor>color).b !== undefined;
}

export interface IRGBAShortColor extends IRGBShortColor {
    readonly a: number;
}

export function isRGBAShortColor(color: IColorDTO): color is IRGBAShortColor {
    return (<IRGBAShortColor>color).a !== undefined &&
              (<IRGBAShortColor>color).r !== undefined &&
                (<IRGBAShortColor>color).g !== undefined &&
                    (<IRGBAShortColor>color).b !== undefined;
}

export interface ICMYKColor extends IColorDTO {
    readonly cyan: number;
    readonly magenta: number;
    readonly yellow: number;
    readonly black: number;
}

export function isCMYKColor(color: IColorDTO): color is ICMYKColor {
    return (<ICMYKColor>color).cyan !== undefined &&
        (<ICMYKColor>color).magenta !== undefined &&
        (<ICMYKColor>color).yellow !== undefined &&
        (<ICMYKColor>color).black !== undefined;
}

export interface ICMYKShortColor extends ICMYKColor {
    readonly c: number;
    readonly m: number;
    readonly y: number;
    readonly k: number;
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
    readonly h: number;
    readonly s: number;
    readonly v: number;
}

export function isHSVShortColor(color: IColorDTO): color is IHSVShortColor {
    return (<IHSVShortColor>color).h !== undefined &&
        (<IHSVShortColor>color).s !== undefined &&
        (<IHSVShortColor>color).v !== undefined;
}