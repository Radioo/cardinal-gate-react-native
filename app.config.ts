import {ExpoConfig, ConfigContext} from 'expo/config';

const REQUIRED_ENV = [
    'EXPO_PUBLIC_API_URL',
] as const;

const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
if (missing.length > 0) {
    throw new Error(
        `Missing required environment variables: ${missing.join(', ')}. ` +
        'Ensure they are defined in .env.production or .env.',
    );
}

export default ({config}: ConfigContext): ExpoConfig => ({
    ...config,
    name: 'CARDINAL GATE',
    slug: 'cardinal-gate-react-native',
});
