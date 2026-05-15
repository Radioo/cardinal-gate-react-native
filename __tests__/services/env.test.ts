describe('services/env', () => {
    const ORIGINAL_VALUE = process.env.EXPO_PUBLIC_API_URL;

    afterEach(() => {
        process.env.EXPO_PUBLIC_API_URL = ORIGINAL_VALUE;
        jest.resetModules();
    });

    it('exposes EXPO_PUBLIC_API_URL as API_URL when set', () => {
        process.env.EXPO_PUBLIC_API_URL = 'https://api.example.com';
        jest.resetModules();
        const {API_URL} = require('@/services/env');
        expect(API_URL).toBe('https://api.example.com');
    });

    it('throws when EXPO_PUBLIC_API_URL is missing', () => {
        delete process.env.EXPO_PUBLIC_API_URL;
        jest.resetModules();
        expect(() => require('@/services/env')).toThrow(/EXPO_PUBLIC_API_URL is not set/);
    });

    it('throws when EXPO_PUBLIC_API_URL is empty string', () => {
        process.env.EXPO_PUBLIC_API_URL = '';
        jest.resetModules();
        expect(() => require('@/services/env')).toThrow(/EXPO_PUBLIC_API_URL is not set/);
    });
});
