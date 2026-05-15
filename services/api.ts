import {buildAuthRequestInit} from "@/services/auth-headers";
import {clearSession} from "@/services/auth";
import {requireApiUrl} from "@/services/env";

type FetchApiOptions = {
    skipRootUrl?: boolean;
    skipAuth?: boolean;
};

/**
 * Thrown by fetchApi/fetchApiBlob when the server returns 401. The session
 * has been cleared and any registered unauthorized handler invoked before
 * this is thrown — callers typically don't need to react to it, but `instanceof`
 * checks are supported.
 */
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
    const url = options.skipRootUrl ? endpoint : `${requireApiUrl()}${endpoint}`;

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

/**
 * Fetch JSON from the API.
 * @throws {SessionExpiredError} on 401 — session has already been cleared.
 * @throws {Error} on other non-OK responses (server `error` field if present, otherwise a generic message).
 */
export async function fetchApi<T>(
    endpoint: string,
    init?: RequestInit,
    options: FetchApiOptions = {},
): Promise<T> {
    const response = await baseFetch(endpoint, init, options);
    return await response.json() as T;
}

/**
 * Fetch a binary blob from the API.
 * @throws {SessionExpiredError} on 401 — session has already been cleared.
 * @throws {Error} on other non-OK responses (server `error` field if present, otherwise a generic message).
 */
export async function fetchApiBlob(
    endpoint: string,
    init?: RequestInit,
    options: FetchApiOptions = {},
): Promise<Blob> {
    const response = await baseFetch(endpoint, init, options);
    return await response.blob();
}
