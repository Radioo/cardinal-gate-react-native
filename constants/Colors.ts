import {darken, lighten} from "polished";

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';
const primaryColor = '#f28b28';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    primary: primaryColor,
    primarySurface: lighten(0.4, primaryColor),
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    primary: primaryColor,
    primarySurface: darken(0.4, primaryColor),
  },
};
