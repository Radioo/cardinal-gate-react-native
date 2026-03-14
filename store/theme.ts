import {create} from "zustand";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persist, createJSONStorage} from "zustand/middleware";

interface ThemeStore {
    primaryColor: string;
    setPrimaryColor: (color: string) => void;
}

export const useThemeStore = create<ThemeStore>()(
    persist(
        (set) => ({
            primaryColor: '#f28b28',
            setPrimaryColor: (color) => set({primaryColor: color}),
        }),
        {
            name: 'theme-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

