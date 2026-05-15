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

    it('module loads without throwing even when EXPO_PUBLIC_API_URL is missing', () => {
        delete process.env.EXPO_PUBLIC_API_URL;
        jest.resetModules();
        expect(() => require('@/services/env')).not.toThrow();
    });

    it('defaults API_URL to empty string when missing', () => {
        delete process.env.EXPO_PUBLIC_API_URL;
        jest.resetModules();
        const {API_URL} = require('@/services/env');
        expect(API_URL).toBe('');
    });

    it('requireApiUrl throws when missing', () => {
        delete process.env.EXPO_PUBLIC_API_URL;
        jest.resetModules();
        const {requireApiUrl} = require('@/services/env');
        expect(() => requireApiUrl()).toThrow(/EXPO_PUBLIC_API_URL is not set/);
    });

    it('requireApiUrl throws when empty string', () => {
        process.env.EXPO_PUBLIC_API_URL = '';
        jest.resetModules();
        const {requireApiUrl} = require('@/services/env');
        expect(() => requireApiUrl()).toThrow(/EXPO_PUBLIC_API_URL is not set/);
    });

    it('requireApiUrl returns the value when set', () => {
        process.env.EXPO_PUBLIC_API_URL = 'https://api.example.com';
        jest.resetModules();
        const {requireApiUrl} = require('@/services/env');
        expect(requireApiUrl()).toBe('https://api.example.com');
    });
});
