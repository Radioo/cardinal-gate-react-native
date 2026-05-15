import {Platform} from 'react-native';
import {webStyle, webTextStyle} from '@/lib/web-style';

describe('webStyle', () => {
    const originalOS = Platform.OS;

    afterEach(() => {
        Object.defineProperty(Platform, 'OS', {value: originalOS, configurable: true});
    });

    it('returns the supplied style on web', () => {
        Object.defineProperty(Platform, 'OS', {value: 'web', configurable: true});
        expect(webStyle({cursor: 'pointer'})).toEqual({cursor: 'pointer'});
    });

    it('returns an empty style on native (ios)', () => {
        Object.defineProperty(Platform, 'OS', {value: 'ios', configurable: true});
        expect(webStyle({cursor: 'pointer'})).toEqual({});
    });

    it('returns an empty style on native (android)', () => {
        Object.defineProperty(Platform, 'OS', {value: 'android', configurable: true});
        expect(webStyle({cursor: 'help'})).toEqual({});
    });
});

describe('webTextStyle', () => {
    const originalOS = Platform.OS;

    afterEach(() => {
        Object.defineProperty(Platform, 'OS', {value: originalOS, configurable: true});
    });

    it('returns the supplied web text style on web', () => {
        Object.defineProperty(Platform, 'OS', {value: 'web', configurable: true});
        expect(webTextStyle({backgroundImage: 'linear-gradient(red, blue)'})).toEqual({
            backgroundImage: 'linear-gradient(red, blue)',
        });
    });

    it('returns an empty style on native', () => {
        Object.defineProperty(Platform, 'OS', {value: 'android', configurable: true});
        expect(webTextStyle({backgroundImage: 'linear-gradient(red, blue)'})).toEqual({});
    });
});
