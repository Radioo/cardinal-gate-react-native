import {SecureValue} from "@/enums/secure-value";
import * as SecureStore from 'expo-secure-store';
import {Platform} from "react-native";

const saveSecureValue = async (key: SecureValue, value: string) => {
    if(Platform.OS === 'web') {
        localStorage.setItem(key, value);
        return;
    }

    await SecureStore.setItemAsync(key, value);
}

const getSecureValue = (key: SecureValue): Promise<string | null> => {
    if(Platform.OS === 'web') {
        return Promise.resolve(localStorage.getItem(key));
    }

    return SecureStore.getItemAsync(key);
}

const clearSecureValue = async (key: SecureValue) => {
    if(Platform.OS === 'web') {
        localStorage.removeItem(key);
        return;
    }

    await SecureStore.deleteItemAsync(key);
}

export {
    saveSecureValue,
    getSecureValue,
    clearSecureValue,
}
