import {darken, lighten} from "polished";

export const Colors = (primary: string) => {
    return {
        light: {
            text: '#11181C',
            background: '#fff',
            tint: '#0a7ea4',
            icon: '#687076',
            tabIconDefault: '#687076',
            tabIconSelected: '#0a7ea4',
            primary: primary,
            primarySurface: lighten(0.4, primary),
        },
        dark: {
            text: '#ECEDEE',
            background: '#151718',
            tint: '#fff',
            icon: '#9BA1A6',
            tabIconDefault: '#9BA1A6',
            tabIconSelected: '#fff',
            primary: primary,
            primarySurface: darken(0.4, primary),
        },
    }
};
