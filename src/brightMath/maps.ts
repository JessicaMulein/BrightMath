import { EColorSpace, EColorChannel, ELabWhitePoint } from "./enumerations";
import xyY from "./xyY";

export const colorChannelMaps: Map<EColorSpace, Array<EColorChannel>> = new Map<EColorSpace, Array<EColorChannel>>(
    [
        [EColorSpace.CMYK, [
            EColorChannel.Cyan,
            EColorChannel.Magenta,
            EColorChannel.Yellow,
            EColorChannel.Black
        ]],
        [EColorSpace.RGB, [
            EColorChannel.Red,
            EColorChannel.Green,
            EColorChannel.Blue
        ]],
        [EColorSpace.RGBA, [
            EColorChannel.Red,
            EColorChannel.Green,
            EColorChannel.Blue,
            EColorChannel.Alpha
        ]],
        [EColorSpace.HSV, [
            EColorChannel.Hue,
            EColorChannel.Saturation,
            EColorChannel.Brightness
        ]],
    ]
);

export function getColorChannelType(colorSpace: EColorSpace, index: number): EColorChannel {
    const colorChannelMap = colorChannelMaps.get(colorSpace);
    if (colorChannelMap === undefined || colorChannelMap === null) {
        throw new Error(`Invalid color source: ${colorSpace}`);
    }
    if (index < 0 || index >= colorChannelMap.length) {
        throw new Error(`Invalid color channel index: ${index}`);
    }
    return colorChannelMap[index];
}

export function getColorChannelIndex(colorSpace: EColorSpace, colorChannel: EColorChannel): number {
    const channelsArray = colorChannelMaps.get(colorSpace);
    if (channelsArray === undefined) {
        throw new Error('getColorChannel: Color space not found.');
    }
    const index = channelsArray.indexOf(colorChannel);
    if (index === -1) {
        throw new Error('getColorChannel: Color channel not found.');
    }
    return index;
}

export function getColorChannelCount(colorSpace: EColorSpace): number {
    const channelsArray = colorChannelMaps.get(colorSpace);
    if (channelsArray === undefined) {
        throw new Error('getColorChannel: Color space not found.');
    }
    return channelsArray.length;
}