import {getSecureValue} from "@/store/secure";
import {SecureValue} from "@/enums/secure-value";

export async function buildAuthRequestInit(init?: RequestInit): Promise<RequestInit> {
    const token = await getSecureValue(SecureValue.TOKEN);
    const headers: Record<string, string> = {};

    if (token !== null) {
        headers['CG-Token'] = token;
    }

    return {
        ...init,
        headers: {
            ...init?.headers,
            ...headers,
        },
    };
}
