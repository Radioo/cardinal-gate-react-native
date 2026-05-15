import {Platform} from 'react-native';

const mockGetAccentColor = jest.fn();

jest.mock('@/modules/expo-material-you/src/ExpoMaterialYouModule', () => ({
    __esModule: true,
    default: {getAccentColor: (...args: unknown[]) => mockGetAccentColor(...args)},
}), {virtual: true});

import {getMaterialYouAccent} from '@/modules/expo-material-you/src';

describe('getMaterialYouAccent', () => {
    const originalOS = Platform.OS;

    afterEach(() => {
        Object.defineProperty(Platform, 'OS', {value: originalOS, configurable: true});
        mockGetAccentColor.mockReset();
    });

    it('returns null on non-android platforms without invoking the native module', () => {
        Object.defineProperty(Platform, 'OS', {value: 'ios', configurable: true});
        expect(getMaterialYouAccent()).toBeNull();
        expect(mockGetAccentColor).not.toHaveBeenCalled();
    });

    it('returns the native string accent on android', () => {
        Object.defineProperty(Platform, 'OS', {value: 'android', configurable: true});
        mockGetAccentColor.mockReturnValue('#e6832a');
        expect(getMaterialYouAccent()).toBe('#e6832a');
    });

    it('returns null when the native module returns null', () => {
        Object.defineProperty(Platform, 'OS', {value: 'android', configurable: true});
        mockGetAccentColor.mockReturnValue(null);
        expect(getMaterialYouAccent()).toBeNull();
    });

    it('returns null when the native module returns a non-string', () => {
        Object.defineProperty(Platform, 'OS', {value: 'android', configurable: true});
        mockGetAccentColor.mockReturnValue(undefined);
        expect(getMaterialYouAccent()).toBeNull();
    });
});
