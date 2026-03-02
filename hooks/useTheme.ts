import { useColorScheme } from '@/hooks/useColorScheme';
import {Colors} from "@/constants/Colors";
import {useThemeStore} from "@/store/theme";

export default function useTheme() {
    const {primaryColor} = useThemeStore();
    const colorScheme = useColorScheme();
    const theme = (colorScheme === 'light' || colorScheme === 'dark') ? colorScheme : 'light';
    const colors = Colors(primaryColor);

    return {
        scheme: theme,
        ...colors[theme]
    };
}
