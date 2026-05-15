import {API_URL} from "@/services/env";

/**
 * Returns true when the URL is same-origin with the configured API (or is a
 * relative/path-only URL). Use this anywhere auth headers should be attached
 * so credentials never leak to third-party hosts.
 */
export function isApiOrigin(url: string): boolean {
    return url.startsWith('/') || url.startsWith(API_URL);
}
