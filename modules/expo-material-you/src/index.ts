import {Platform} from 'react-native';

export function getMaterialYouAccent(): string | null {
    if (Platform.OS !== 'android') return null;
    return require('./ExpoMaterialYouModule').default.getAccentColor() ?? null;
}
