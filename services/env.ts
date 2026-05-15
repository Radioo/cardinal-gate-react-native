// Metro inlines direct process.env.EXPO_PUBLIC_* references at bundle time.
// Dynamic access like process.env[name] is NOT inlined and breaks in production.
function readApiUrl(): string {
    const value = process.env.EXPO_PUBLIC_API_URL;
    if (!value) {
        throw new Error('EXPO_PUBLIC_API_URL is not set. Provide it via eas.json env, .env, or the shell before bundling.');
    }
    return value;
}

export const API_URL: string = readApiUrl();
