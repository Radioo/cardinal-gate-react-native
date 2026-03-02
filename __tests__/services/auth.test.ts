jest.mock('@/store/secure', () => ({
    saveSecureValue: jest.fn(),
    clearSecureValue: jest.fn(),
}));

jest.mock('@/services/query-client', () => ({
    queryClient: {
        removeQueries: jest.fn(),
    },
}));

import {setAuthToken, clearSession} from '@/services/auth';
import {saveSecureValue, clearSecureValue} from '@/store/secure';
import {SecureValue} from '@/enums/secure-value';
import {queryClient} from '@/services/query-client';

const mockSaveSecureValue = saveSecureValue as jest.MockedFunction<typeof saveSecureValue>;
const mockClearSecureValue = clearSecureValue as jest.MockedFunction<typeof clearSecureValue>;

describe('setAuthToken', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('saves the token to secure storage', async () => {
        await setAuthToken('my-token');
        expect(mockSaveSecureValue).toHaveBeenCalledWith(SecureValue.TOKEN, 'my-token');
    });

    it('saves a different token value', async () => {
        await setAuthToken('another-token');
        expect(mockSaveSecureValue).toHaveBeenCalledWith(SecureValue.TOKEN, 'another-token');
    });
});

describe('clearSession', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('clears the token from secure storage', async () => {
        await clearSession();
        expect(mockClearSecureValue).toHaveBeenCalledWith(SecureValue.TOKEN);
    });

    it('removes all queries from the query client', async () => {
        await clearSession();
        expect(queryClient.removeQueries).toHaveBeenCalled();
    });
});
