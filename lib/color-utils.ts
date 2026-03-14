export function hexToHsl(hex: string): { h: number; s: number; l: number } {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;
    const l = (max + min) / 2;

    let h = 0;
    let s = 0;

    if (d !== 0) {
        s = d / (1 - Math.abs(2 * l - 1));
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) * 60; break;
            case g: h = ((b - r) / d + 2) * 60; break;
            case b: h = ((r - g) / d + 4) * 60; break;
            default: break; // max is always r, g, or b; unreachable
        }
    }

    return { h, s: s * 100, l: l * 100 };
}

/**
 * Convert a hex color to an HSL CSS variable string (without the hsl() wrapper),
 * e.g. "29 89% 55%".
 */
export function hexToHslVar(hex: string): string {
    const { h, s, l } = hexToHsl(hex);
    return `${Math.round(h)} ${Math.round(s)}% ${Math.round(l)}%`;
}

/**
 * Lighten a hex color by an absolute amount (matching polished's lighten behavior).
 * Returns an HSL CSS variable string.
 */
export function lightenToHslVar(hex: string, amount: number): string {
    const { h, s, l } = hexToHsl(hex);
    const newL = Math.min(100, l + amount * 100);
    return `${Math.round(h)} ${Math.round(s)}% ${Math.round(newL)}%`;
}

/**
 * Darken a hex color by an absolute amount (matching polished's darken behavior).
 * Returns an HSL CSS variable string.
 */
export function darkenToHslVar(hex: string, amount: number): string {
    const { h, s, l } = hexToHsl(hex);
    const newL = Math.max(0, l - amount * 100);
    return `${Math.round(h)} ${Math.round(s)}% ${Math.round(newL)}%`;
}

/**
 * Build the CSS custom property values for the primary color theme.
 * Used by the root layout and modal overlays to keep variables in sync.
 */
export function buildPrimaryColorVars(primaryColor: string, isDark: boolean): Record<string, string> {
    return {
        '--primary': hexToHslVar(primaryColor),
        '--primary-surface': isDark
            ? darkenToHslVar(primaryColor, 0.4)
            : lightenToHslVar(primaryColor, 0.4),
        '--input': hexToHslVar(primaryColor),
        '--ring': hexToHslVar(primaryColor),
    };
}
