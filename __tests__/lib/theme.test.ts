import {DarkTheme, DefaultTheme} from '@react-navigation/native';
import {getNavTheme} from '@/lib/theme';

describe('getNavTheme', () => {
    it('extends DefaultTheme for light mode', () => {
        const theme = getNavTheme('#3b82f6', false);
        expect(theme.dark).toBe(DefaultTheme.dark);
    });

    it('extends DarkTheme for dark mode', () => {
        const theme = getNavTheme('#3b82f6', true);
        expect(theme.dark).toBe(DarkTheme.dark);
    });

    it('returns correct light mode static colors', () => {
        const theme = getNavTheme('#3b82f6', false);
        expect(theme.colors.background).toBe('transparent');
        expect(theme.colors.card).toBe('hsl(0, 0%, 100%)');
        expect(theme.colors.border).toBe('hsl(0, 0%, 89.8%)');
        expect(theme.colors.text).toBe('hsl(204, 23%, 9%)');
        expect(theme.colors.notification).toBe('hsl(0, 84.2%, 60.2%)');
    });

    it('returns correct dark mode static colors', () => {
        const theme = getNavTheme('#3b82f6', true);
        expect(theme.colors.background).toBe('transparent');
        expect(theme.colors.card).toBe('hsl(200, 9%, 9%)');
        expect(theme.colors.border).toBe('hsl(0, 0%, 14.9%)');
        expect(theme.colors.text).toBe('hsl(200, 4%, 93%)');
        expect(theme.colors.notification).toBe('hsl(0, 70.9%, 59.4%)');
    });

    it('converts primary hex to HSL string', () => {
        const theme = getNavTheme('#ff0000', false);
        expect(theme.colors.primary).toBe('hsl(0, 100%, 50%)');
    });

    it('converts blue hex to HSL string', () => {
        const theme = getNavTheme('#0000ff', false);
        expect(theme.colors.primary).toBe('hsl(240, 100%, 50%)');
    });

    it('primary color is the same regardless of dark/light mode', () => {
        const light = getNavTheme('#3b82f6', false);
        const dark = getNavTheme('#3b82f6', true);
        expect(light.colors.primary).toBe(dark.colors.primary);
    });

    it('returns all 6 required color keys', () => {
        const theme = getNavTheme('#3b82f6', false);
        const keys = Object.keys(theme.colors).sort();
        expect(keys).toEqual(['background', 'border', 'card', 'notification', 'primary', 'text']);
    });
});
