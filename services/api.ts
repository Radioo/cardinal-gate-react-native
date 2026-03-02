import {buildAuthRequestInit} from "@/services/auth-headers";
import {clearSession} from "@/services/auth";
import {router} from "expo-router";

type FetchApiOptions = {
    skipRootUrl?: boolean;
    skipAuth?: boolean;
};

async function baseFetch(
    endpoint: string,
    init?: RequestInit,
    options: FetchApiOptions = {},
): Promise<Response> {
    const requestInit = options.skipAuth ? (init ?? {}) : await buildAuthRequestInit(init);
    const url = options.skipRootUrl ? endpoint : `${process.env.EXPO_PUBLIC_API_URL}${endpoint}`;

    const response = await fetch(url, requestInit);

    if (response.status === 401) {
        await clearSession();
        router.replace('/login');
        throw new Error('Session expired');
    }

    if (!response.ok) {
        const contentType = response.headers.get('content-type') ?? '';
        if (contentType.startsWith('application/json')) {
            const json = await response.json();
            throw new Error(json.error);
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
