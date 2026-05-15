import {Platform} from "react-native";

type ExpoMaterialYouModule = {
    getAccentColor(): string | null | undefined;
};

export function getMaterialYouAccent(): string | null {
    if (Platform.OS !== 'android') return null;
    const native = (require('./ExpoMaterialYouModule') as {default: ExpoMaterialYouModule}).default;
    const accent = native.getAccentColor();
    return typeof accent === 'string' ? accent : null;
}
