import {useThemeStore} from '@/store/theme';
import {useColorScheme} from '@/hooks/useColorScheme';
import {buildPrimaryColorVars} from '@/lib/color-utils';
import {useMemo} from 'react';
import {vars} from 'nativewind';

/**
 * Returns memoized NativeWind dynamic vars for the current primary color.
 * Used by the root layout (to scope vars to the root view) and by portal-based
 * components like SelectContent (which render outside the root's var scope).
 */
export default function usePrimaryColorVars() {
    const {primaryColor} = useThemeStore();
    const isDark = useColorScheme() === 'dark';
    return useMemo(
        () => vars(buildPrimaryColorVars(primaryColor, isDark)),
        [primaryColor, isDark],
    );
}
