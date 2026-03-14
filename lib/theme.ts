import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native';
import {hexToHsl} from "@/lib/color-utils";

const STATIC_COLORS = {
  light: {
    background: 'hsl(0, 0%, 100%)',
    foreground: 'hsl(204, 23%, 9%)',
    card: 'hsl(0, 0%, 100%)',
    border: 'hsl(0, 0%, 89.8%)',
    destructive: 'hsl(0, 84.2%, 60.2%)',
  },
  dark: {
    background: 'hsl(200, 9%, 9%)',
    foreground: 'hsl(200, 4%, 93%)',
    card: 'hsl(200, 9%, 9%)',
    border: 'hsl(0, 0%, 14.9%)',
    destructive: 'hsl(0, 70.9%, 59.4%)',
  },
};

function hexToHslString(hex: string): string {
  const { h, s, l } = hexToHsl(hex);
  return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`;
}

export function getNavTheme(primaryColor: string, isDark: boolean): Theme {
  const mode = isDark ? 'dark' : 'light';
  const base = isDark ? DarkTheme : DefaultTheme;
  const colors = STATIC_COLORS[mode];
  return {
    ...base,
    colors: {
      background: 'transparent',
      border: colors.border,
      card: colors.card,
      notification: colors.destructive,
      primary: hexToHslString(primaryColor),
      text: colors.foreground,
    },
  };
}
