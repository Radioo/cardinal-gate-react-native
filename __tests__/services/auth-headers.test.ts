jest.mock('@/services/secure-storage', () => ({
    getSecureValue: jest.fn(),
}));

import {buildAuthRequestInit, AUTH_HEADER_NAME} from '@/services/auth-headers';
import {getSecureValue} from '@/services/secure-storage';

const mockGetSecureValue = getSecureValue as jest.MockedFunction<typeof getSecureValue>;

describe('buildAuthRequestInit', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('adds CG-Token header when token exists', async () => {
        mockGetSecureValue.mockResolvedValue('test-token');
        const result = await buildAuthRequestInit();
        expect(result.headers).toEqual({[AUTH_HEADER_NAME]: 'test-token'});
    });

    it('does not add CG-Token header when token is null', async () => {
        mockGetSecureValue.mockResolvedValue(null);
        const result = await buildAuthRequestInit();
        expect(result.headers).toEqual({});
    });

    it('merges with existing init headers', async () => {
        mockGetSecureValue.mockResolvedValue('test-token');
        const result = await buildAuthRequestInit({
            headers: {'Content-Type': 'application/json'},
        });
        expect(result.headers).toEqual({
            'Content-Type': 'application/json',
            [AUTH_HEADER_NAME]: 'test-token',
        });
    });

    it('preserves other init properties', async () => {
        mockGetSecureValue.mockResolvedValue('test-token');
        const result = await buildAuthRequestInit({method: 'POST'});
        expect(result.method).toBe('POST');
    });
});
