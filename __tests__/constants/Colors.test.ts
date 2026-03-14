jest.mock('polished', () => ({
    darken: (_a: number, c: string) => c,
    lighten: (_a: number, c: string) => c,
}));

import {buildColorPalette} from '@/constants/Colors';

describe('buildColorPalette', () => {
    const result = buildColorPalette('#f28b28');

    it('returns an object with light and dark keys', () => {
        expect(result).toHaveProperty('light');
        expect(result).toHaveProperty('dark');
    });

    it('light theme has text, background, and primary properties', () => {
        expect(result.light).toHaveProperty('text');
        expect(result.light).toHaveProperty('background');
        expect(result.light).toHaveProperty('primary');
    });

    it('dark theme has text, background, and primary properties', () => {
        expect(result.dark).toHaveProperty('text');
        expect(result.dark).toHaveProperty('background');
        expect(result.dark).toHaveProperty('primary');
    });
});
