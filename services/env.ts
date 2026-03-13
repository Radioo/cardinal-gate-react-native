const REQUIRED_ENV_VARS = [
    'EXPO_PUBLIC_API_URL',
] as const;

type RequiredEnvVar = typeof REQUIRED_ENV_VARS[number];

function getRequiredEnv(name: RequiredEnvVar): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(
            `Missing required environment variable: ${name}. ` +
            'Ensure it is defined in your .env file.',
        );
    }
    return value;
}

export const API_URL = getRequiredEnv('EXPO_PUBLIC_API_URL');
