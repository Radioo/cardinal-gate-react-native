// Metro inlines direct process.env.EXPO_PUBLIC_* references at bundle time.
// Dynamic access like process.env[name] is NOT inlined and breaks in production.
// Build-time validation is handled by scripts/validate-env.ts.
export const API_URL: string = process.env.EXPO_PUBLIC_API_URL ?? '';
