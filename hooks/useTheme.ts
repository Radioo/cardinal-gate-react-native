import { useColorScheme } from '@/hooks/useColorScheme';
import {Colors} from "@/constants/Colors";

export function useTheme() {
    const theme = useColorScheme() ?? 'light';

    return {
        scheme: theme,
        ...Colors[theme]
    };
}
