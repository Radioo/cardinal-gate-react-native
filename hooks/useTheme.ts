import { useColorScheme } from '@/hooks/useColorScheme';
import {Colors} from "@/constants/Colors";
import {useThemeStore} from "@/store/theme";

export function useTheme() {
    const {primaryColor} = useThemeStore();
    const theme = useColorScheme() ?? 'light';
    const colors = Colors(primaryColor);

    return {
        scheme: theme,
        ...colors[theme]
    };
}
