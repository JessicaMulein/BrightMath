import { EColorSource, EColorChannel } from "./enumerations";

export const colorChannelCountMap: Map<EColorSource, number> = new Map<EColorSource, number>([
    [EColorSource.CMYK, 4],
    [EColorSource.RGB, 3],
    [EColorSource.RGBA, 4]
]);

export const colorChannelMaps: Map<EColorSource, Array<EColorChannel>> = new Map<EColorSource, Array<EColorChannel>>(
    [
        [EColorSource.CMYK, [
            EColorChannel.Cyan,
            EColorChannel.Magenta,
            EColorChannel.Yellow,
            EColorChannel.Black
        ]],
        [EColorSource.RGB, [
            EColorChannel.Red,
            EColorChannel.Green,
            EColorChannel.Blue
        ]],
        [EColorSource.RGBA, [
            EColorChannel.Red,
            EColorChannel.Green,
            EColorChannel.Blue,
            EColorChannel.Alpha
        ]],
    ]
);

export function getColorChannel(colorSource: EColorSource, colorChannel: EColorChannel): number {
    const channelsArray = colorChannelMaps.get(colorSource);
    if (channelsArray === undefined) {
        throw new Error('getColorChannel: Color channel map not found.');
    }
    const index = channelsArray.indexOf(colorChannel);
    if (index === -1) {
        throw new Error('getColorChannel: Color channel not found.');
    }
    return index;
}

export const colorChannelStringMap: Map<EColorChannel, string> = new Map<EColorChannel, string>([
    [EColorChannel.Cyan, 'Cyan'],
    [EColorChannel.Magenta, 'Magenta'],
    [EColorChannel.Yellow, 'Yellow'],
    [EColorChannel.Black, 'Black'],
    [EColorChannel.Red, 'Red'],
    [EColorChannel.Green, 'Green'],
    [EColorChannel.Blue, 'Blue'],
    [EColorChannel.Alpha, 'Alpha']
]);

export const colorSourceStringMap: Map<EColorSource, string> = new Map<EColorSource, string>([
    [EColorSource.CMYK, 'CMYK'],
    [EColorSource.RGB, 'RGB'],
    [EColorSource.RGBA, 'RGBA']
]);