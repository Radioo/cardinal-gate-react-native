import {getSecureValue} from "@/services/secure-storage";
import {SecureValue} from "@/enums/secure-value";

export const AUTH_HEADER_NAME = 'CG-Token';

export async function buildAuthHeaders(): Promise<Record<string, string>> {
    const token = await getSecureValue(SecureValue.TOKEN);
    if (token === null) return {};
    return {[AUTH_HEADER_NAME]: token};
}

export async function buildAuthRequestInit(init?: RequestInit): Promise<RequestInit> {
    const authHeaders = await buildAuthHeaders();

    return {
        ...init,
        headers: {
            ...init?.headers,
            ...authHeaders,
        },
    };
}
