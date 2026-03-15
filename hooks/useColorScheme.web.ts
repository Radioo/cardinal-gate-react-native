import {useSyncExternalStore} from 'react';
import type {ColorSchemeName} from 'react-native';

const query = '(prefers-color-scheme: dark)';

function subscribe(callback: () => void) {
    const mq = window.matchMedia(query);
    mq.addEventListener('change', callback);
    return () => mq.removeEventListener('change', callback);
}

function getSnapshot(): ColorSchemeName {
    return window.matchMedia(query).matches ? 'dark' : 'light';
}

function getServerSnapshot(): ColorSchemeName {
    return 'light';
}

export function useColorScheme(): ColorSchemeName {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
