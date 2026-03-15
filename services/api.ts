import {buildAuthRequestInit} from "@/services/auth-headers";
import {clearSession} from "@/services/auth";
import {API_URL} from "@/services/env";

type FetchApiOptions = {
    skipRootUrl?: boolean;
    skipAuth?: boolean;
};

export class SessionExpiredError extends Error {
    constructor() {
        super('Session expired');
        this.name = 'SessionExpiredError';
    }
}

let _onUnauthorized: (() => void) | null = null;

/**
 * Register a handler for 401 responses. Called once from the app layout
 * so the service layer never imports a navigation framework directly.
 */
export function setOnUnauthorized(handler: () => void) {
    _onUnauthorized = handler;
}

async function baseFetch(
    endpoint: string,
    init?: RequestInit,
    options: FetchApiOptions = {},
): Promise<Response> {
    const requestInit = options.skipAuth ? (init ?? {}) : await buildAuthRequestInit(init);
    const url = options.skipRootUrl ? endpoint : `${API_URL}${endpoint}`;

    const response = await fetch(url, requestInit);

    if (response.status === 401) {
        await clearSession();
        _onUnauthorized?.();
        throw new SessionExpiredError();
    }

    if (!response.ok) {
        const contentType = response.headers.get('content-type') ?? '';
        if (contentType.startsWith('application/json')) {
            const json = await response.json();
            throw new Error(typeof json.error === 'string' ? json.error : `Failed to fetch ${endpoint}`);
        }
        throw new Error(`Failed to fetch ${endpoint}`);
    }

    return response;
}

export async function fetchApi<T>(
    endpoint: string,
    init?: RequestInit,
    options: FetchApiOptions = {},
): Promise<T> {
    const response = await baseFetch(endpoint, init, options);
    return await response.json() as T;
}

export async function fetchApiBlob(
    endpoint: string,
    init?: RequestInit,
    options: FetchApiOptions = {},
): Promise<Blob> {
    const response = await baseFetch(endpoint, init, options);
    return await response.blob();
}
