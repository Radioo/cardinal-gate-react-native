import {hexToHsl, hexToHslVar, hexToRgba, lightenToHslVar, darkenToHslVar, buildPrimaryColorVars, buildColorPalette, lightenHex, darkenHex} from '@/lib/color-utils';

describe('hexToRgba', () => {
    it('converts hex to rgba with given alpha', () => {
        expect(hexToRgba('#ff0000', 0.5)).toBe('rgba(255, 0, 0, 0.5)');
    });

    it('handles full opacity', () => {
        expect(hexToRgba('#00ff00', 1)).toBe('rgba(0, 255, 0, 1)');
    });

    it('handles zero opacity', () => {
        expect(hexToRgba('#0000ff', 0)).toBe('rgba(0, 0, 255, 0)');
    });
});

describe('buildColorPalette', () => {
    it('returns light and dark themes', () => {
        const result = buildColorPalette('#f28b28');
        expect(result).toHaveProperty('light');
        expect(result).toHaveProperty('dark');
    });

    it('sets primary color in both themes', () => {
        const result = buildColorPalette('#f28b28');
        expect(result.light.primary).toBe('#f28b28');
        expect(result.dark.primary).toBe('#f28b28');
    });

    it('includes all required theme properties', () => {
        const result = buildColorPalette('#f28b28');
        const keys = ['text', 'background', 'tint', 'icon', 'tabIconDefault', 'tabIconSelected', 'primary', 'primarySurface'];
        for (const key of keys) {
            expect(result.light).toHaveProperty(key);
            expect(result.dark).toHaveProperty(key);
        }
    });
});

describe('hexToHsl', () => {
    it('converts pure red', () => {
        const {h, s, l} = hexToHsl('#ff0000');
        expect(h).toBeCloseTo(0, 0);
        expect(s).toBeCloseTo(100, 0);
        expect(l).toBeCloseTo(50, 0);
    });

    it('converts pure green', () => {
        const {h, s, l} = hexToHsl('#00ff00');
        expect(h).toBeCloseTo(120, 0);
        expect(s).toBeCloseTo(100, 0);
        expect(l).toBeCloseTo(50, 0);
    });

    it('converts pure blue', () => {
        const {h, s, l} = hexToHsl('#0000ff');
        expect(h).toBeCloseTo(240, 0);
        expect(s).toBeCloseTo(100, 0);
        expect(l).toBeCloseTo(50, 0);
    });

    it('converts white', () => {
        const {h, s, l} = hexToHsl('#ffffff');
        expect(h).toBe(0);
        expect(s).toBe(0);
        expect(l).toBeCloseTo(100, 0);
    });

    it('converts black', () => {
        const {h, s, l} = hexToHsl('#000000');
        expect(h).toBe(0);
        expect(s).toBe(0);
        expect(l).toBe(0);
    });

    it('converts a mid-tone orange', () => {
        const {h, s, l} = hexToHsl('#e6832a');
        expect(h).toBeCloseTo(28, 0);
        expect(s).toBeCloseTo(79, 0);
        expect(l).toBeCloseTo(53, 0);
    });
});

describe('hexToHslVar', () => {
    it('returns HSL string without wrapper', () => {
        const result = hexToHslVar('#ff0000');
        expect(result).toBe('0 100% 50%');
    });

    it('rounds values', () => {
        const result = hexToHslVar('#e6832a');
        expect(result).toMatch(/^\d+ \d+% \d+%$/);
    });
});

describe('lightenToHslVar', () => {
    it('increases lightness by the given amount', () => {
        const base = hexToHsl('#e6832a');
        const result = lightenToHslVar('#e6832a', 0.4);
        const parts = result.split(' ');
        const newL = parseInt(parts[2]);
        expect(newL).toBeGreaterThan(Math.round(base.l));
    });

    it('clamps at 100%', () => {
        const result = lightenToHslVar('#ffffff', 0.5);
        expect(result).toContain('100%');
    });
});

describe('darkenToHslVar', () => {
    it('decreases lightness by the given amount', () => {
        const base = hexToHsl('#e6832a');
        const result = darkenToHslVar('#e6832a', 0.4);
        const parts = result.split(' ');
        const newL = parseInt(parts[2]);
        expect(newL).toBeLessThan(Math.round(base.l));
    });

    it('clamps at 0%', () => {
        const result = darkenToHslVar('#000000', 0.5);
        expect(result).toContain('0%');
    });
});

describe('lightenHex', () => {
    it('lightens a color', () => {
        const result = lightenHex(0.2, '#000000');
        expect(result).toBe('#333333');
    });

    it('clamps at white', () => {
        const result = lightenHex(1, '#ffffff');
        expect(result).toBe('#ffffff');
    });

    it('returns a valid hex string', () => {
        const result = lightenHex(0.1, '#ff0000');
        expect(result).toMatch(/^#[0-9a-f]{6}$/);
    });
});

describe('darkenHex', () => {
    it('darkens a color', () => {
        const result = darkenHex(0.5, '#ffffff');
        // white (l=100) darkened by 0.5 = l=50 → gray
        expect(result).toBe('#808080');
    });

    it('clamps at black', () => {
        const result = darkenHex(1, '#000000');
        expect(result).toBe('#000000');
    });

    it('returns a valid hex string', () => {
        const result = darkenHex(0.1, '#ff0000');
        expect(result).toMatch(/^#[0-9a-f]{6}$/);
    });
});

describe('buildPrimaryColorVars', () => {
    it('returns all four CSS custom properties', () => {
        const result = buildPrimaryColorVars('#e6832a', false);
        expect(result).toHaveProperty('--primary');
        expect(result).toHaveProperty('--primary-surface');
        expect(result).toHaveProperty('--input');
        expect(result).toHaveProperty('--ring');
    });

    it('uses lighten for light mode surface', () => {
        const light = buildPrimaryColorVars('#e6832a', false);
        const dark = buildPrimaryColorVars('#e6832a', true);
        expect(light['--primary-surface']).not.toBe(dark['--primary-surface']);
    });

    it('primary, input, and ring share the same value', () => {
        const result = buildPrimaryColorVars('#e6832a', false);
        expect(result['--primary']).toBe(result['--input']);
        expect(result['--primary']).toBe(result['--ring']);
    });
});
