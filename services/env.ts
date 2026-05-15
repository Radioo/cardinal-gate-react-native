// Metro inlines direct process.env.EXPO_PUBLIC_* references at bundle time.
// Dynamic access like process.env[name] is NOT inlined and breaks in production.
// The default to '' keeps module load safe; baseFetch validates at first use
// so a missing var doesn't cascade an import-time throw through every consumer.
export const API_URL: string = process.env.EXPO_PUBLIC_API_URL ?? '';

export function requireApiUrl(): string {
    if (!API_URL) {
        throw new Error('EXPO_PUBLIC_API_URL is not set. Provide it via eas.json env, .env, or the shell before bundling.');
    }
    return API_URL;
}
