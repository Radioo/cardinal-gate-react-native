import {fetchApi, fetchApiBlob} from '@/services/api';

jest.mock('@/services/auth-headers', () => ({
    buildAuthRequestInit: jest.fn(async (init?: RequestInit) => ({
        ...init,
        headers: {...(init?.headers || {}), 'CG-Token': 'test-token'},
    })),
}));

jest.mock('@/services/auth', () => ({
    clearSession: jest.fn(),
}));

jest.mock('expo-router', () => ({
    router: {replace: jest.fn()},
}));

const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeEach(() => {
    mockFetch.mockReset();
    process.env.EXPO_PUBLIC_API_URL = 'https://api.test.com';
});

describe('fetchApi', () => {
    it('returns JSON for successful response', async () => {
        const mockData = {name: 'Test'};
        mockFetch.mockResolvedValue({
            ok: true,
            status: 200,
            headers: {get: () => 'application/json'},
            json: () => Promise.resolve(mockData),
        });

        const result = await fetchApi('/api2/test');
        expect(result).toEqual(mockData);
        expect(mockFetch).toHaveBeenCalledWith(
            expect.stringContaining('/api2/test'),
            expect.objectContaining({headers: expect.objectContaining({'CG-Token': 'test-token'})}),
        );
    });

    it('throws error for non-ok JSON response', async () => {
        mockFetch.mockResolvedValue({
            ok: false,
            status: 400,
            headers: {get: () => 'application/json'},
            json: () => Promise.resolve({error: 'Not found'}),
        });

        await expect(fetchApi('/api2/test')).rejects.toThrow('Not found');
    });

    it('throws generic error for non-ok non-JSON response', async () => {
        mockFetch.mockResolvedValue({
            ok: false,
            status: 500,
            headers: {get: () => 'text/plain'},
        });

        await expect(fetchApi('/api2/test')).rejects.toThrow('Failed to fetch /api2/test');
    });

    it('handles content-type with charset parameter', async () => {
        const mockData = {name: 'Test'};
        mockFetch.mockResolvedValue({
            ok: true,
            status: 200,
            headers: {get: () => 'application/json; charset=utf-8'},
            json: () => Promise.resolve(mockData),
        });

        const result = await fetchApi('/api2/test');
        expect(result).toEqual(mockData);
    });

    it('throws on 401 after clearing session', async () => {
        mockFetch.mockResolvedValue({
            ok: false,
            status: 401,
            headers: {get: () => 'application/json'},
        });

        await expect(fetchApi('/api2/test')).rejects.toThrow('Session expired');
    });

    it('uses raw URL when skipRootUrl is true', async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            status: 200,
            headers: {get: () => 'application/json'},
            json: () => Promise.resolve({}),
        });

        await fetchApi('https://other.com/api', undefined, {skipRootUrl: true});
        expect(mockFetch).toHaveBeenCalledWith(
            'https://other.com/api',
            expect.any(Object),
        );
    });
});

describe('fetchApiBlob', () => {
    it('returns blob for image response', async () => {
        const mockBlob = new Blob();
        mockFetch.mockResolvedValue({
            ok: true,
            status: 200,
            headers: {get: () => 'image/png'},
            blob: () => Promise.resolve(mockBlob),
        });

        const result = await fetchApiBlob('/api2/image');
        expect(result).toBe(mockBlob);
    });
});
