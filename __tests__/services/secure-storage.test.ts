import {Platform} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {SecureValue} from '@/enums/secure-value';
import {saveSecureValue, getSecureValue, clearSecureValue} from '@/services/secure-storage';

jest.mock('expo-secure-store', () => ({
    setItemAsync: jest.fn(),
    getItemAsync: jest.fn(),
    deleteItemAsync: jest.fn(),
}));

const mockSecureStore = SecureStore as jest.Mocked<typeof SecureStore>;

describe('secure-storage (native)', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        Platform.OS = 'ios';
    });

    it('saveSecureValue delegates to SecureStore.setItemAsync', async () => {
        await saveSecureValue(SecureValue.TOKEN, 'token123');
        expect(mockSecureStore.setItemAsync).toHaveBeenCalledWith(SecureValue.TOKEN, 'token123');
    });

    it('getSecureValue delegates to SecureStore.getItemAsync', async () => {
        mockSecureStore.getItemAsync.mockResolvedValue('stored-token');
        const result = await getSecureValue(SecureValue.TOKEN);
        expect(result).toBe('stored-token');
        expect(mockSecureStore.getItemAsync).toHaveBeenCalledWith(SecureValue.TOKEN);
    });

    it('getSecureValue returns null when nothing stored', async () => {
        mockSecureStore.getItemAsync.mockResolvedValue(null);
        const result = await getSecureValue(SecureValue.TOKEN);
        expect(result).toBeNull();
    });

    it('clearSecureValue delegates to SecureStore.deleteItemAsync', async () => {
        await clearSecureValue(SecureValue.TOKEN);
        expect(mockSecureStore.deleteItemAsync).toHaveBeenCalledWith(SecureValue.TOKEN);
    });
});

describe('secure-storage (web)', () => {
    const mockLocalStorage = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
        Platform.OS = 'web';
        Object.defineProperty(global, 'localStorage', {value: mockLocalStorage, writable: true});
    });

    it('saveSecureValue uses localStorage.setItem', async () => {
        await saveSecureValue(SecureValue.TOKEN, 'web-token');
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith(SecureValue.TOKEN, 'web-token');
        expect(mockSecureStore.setItemAsync).not.toHaveBeenCalled();
    });

    it('getSecureValue uses localStorage.getItem', async () => {
        mockLocalStorage.getItem.mockReturnValue('web-stored');
        const result = await getSecureValue(SecureValue.TOKEN);
        expect(result).toBe('web-stored');
        expect(mockSecureStore.getItemAsync).not.toHaveBeenCalled();
    });

    it('getSecureValue returns null when nothing in localStorage', async () => {
        mockLocalStorage.getItem.mockReturnValue(null);
        const result = await getSecureValue(SecureValue.TOKEN);
        expect(result).toBeNull();
    });

    it('clearSecureValue uses localStorage.removeItem', async () => {
        await clearSecureValue(SecureValue.TOKEN);
        expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(SecureValue.TOKEN);
        expect(mockSecureStore.deleteItemAsync).not.toHaveBeenCalled();
    });
});
