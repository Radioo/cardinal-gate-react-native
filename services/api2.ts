import {getSecureValue} from "@/store/secure";
import {SecureValue} from "@/enums/secure-value";

export default async function fetchApi2<T>(
    endpoint: string,
    init? : RequestInit,
): Promise<T> {
    console.log(`Fetching ${endpoint} ${new Date()}`);

    return getSecureValue(SecureValue.TOKEN)
        .catch(() => Promise.reject('Failed to read token'))
        .then(async token => {
            let headers: any = {};

            if (token !== null) {
                headers['CG-Token'] = token;
            }

            const requestInit = {
                ...init,
                headers: {
                    ...init?.headers,
                    ...headers,
                },
            }

            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}${endpoint}`, requestInit);

            if (!response.ok) {
                if (response.headers.get('content-type') === 'application/json') {
                    return response.json().then(json => {
                        throw new Error(json.error)
                    });
                }

                throw new Error(`Failed to fetch ${endpoint}`);
            }

            return await response.json();
        })
}
