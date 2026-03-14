import { useColorScheme } from '@/hooks/useColorScheme';
import {buildColorPalette} from "@/constants/Colors";
import {useThemeStore} from "@/store/theme";

export default function useTheme() {
    const {primaryColor} = useThemeStore();
    const colorScheme = useColorScheme();
    const theme = (colorScheme === 'light' || colorScheme === 'dark') ? colorScheme : 'light';
    const colors = buildColorPalette(primaryColor);

    return {
        scheme: theme,
        ...colors[theme]
    };
}
