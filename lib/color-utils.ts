export function hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

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

function hslToHex(h: number, s: number, l: number): string {
    const sNorm = s / 100;
    const lNorm = l / 100;
    const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = lNorm - c / 2;
    let r = 0, g = 0, b = 0;
    if (h < 60)      { r = c; g = x; }
    else if (h < 120) { r = x; g = c; }
    else if (h < 180) { g = c; b = x; }
    else if (h < 240) { g = x; b = c; }
    else if (h < 300) { r = x; b = c; }
    else               { r = c; b = x; }
    const toHex = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/** Lighten a hex color by an absolute lightness amount (0–1). Returns hex. */
export function lightenHex(amount: number, hex: string): string {
    const {h, s, l} = hexToHsl(hex);
    return hslToHex(h, s, Math.min(100, l + amount * 100));
}

/** Darken a hex color by an absolute lightness amount (0–1). Returns hex. */
export function darkenHex(amount: number, hex: string): string {
    const {h, s, l} = hexToHsl(hex);
    return hslToHex(h, s, Math.max(0, l - amount * 100));
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

const LIGHT_TOKENS = {
    text: '#11181C',
    background: '#fff',
    tint: '#0a7ea4',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#0a7ea4',
} as const;

const DARK_TOKENS = {
    text: '#ECEDEE',
    background: '#151718',
    tint: '#fff',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#fff',
} as const;

const PRIMARY_SURFACE_AMOUNT = 0.4;

export function buildColorPalette(primary: string) {
    return {
        light: {
            ...LIGHT_TOKENS,
            primary: primary,
            primarySurface: lightenHex(PRIMARY_SURFACE_AMOUNT, primary),
        },
        dark: {
            ...DARK_TOKENS,
            primary: primary,
            primarySurface: darkenHex(PRIMARY_SURFACE_AMOUNT, primary),
        },
    };
}
