import {SecureValue} from "@/enums/secure-value";
import * as SecureStore from 'expo-secure-store';
import {Platform} from "react-native";

export async function saveSecureValue(key: SecureValue, value: string): Promise<void> {
    if(Platform.OS === 'web') {
        localStorage.setItem(key, value);
        return;
    }

    await SecureStore.setItemAsync(key, value);
}

export async function getSecureValue(key: SecureValue): Promise<string | null> {
    if(Platform.OS === 'web') {
        return localStorage.getItem(key);
    }

    return await SecureStore.getItemAsync(key);
}

export async function clearSecureValue(key: SecureValue): Promise<void> {
    if(Platform.OS === 'web') {
        localStorage.removeItem(key);
        return;
    }

    await SecureStore.deleteItemAsync(key);
}
