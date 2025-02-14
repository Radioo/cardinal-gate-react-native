import {getSecureValue} from "@/store/secure";
import {SecureValue} from "@/enums/secure-value";

export default async function fetchApi2<T>(
    endpoint: string,
    init? : RequestInit,
    skipRootUrl = false,
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

            const url = skipRootUrl ? endpoint : `${process.env.EXPO_PUBLIC_API_URL}${endpoint}`;

            const response = await fetch(url, requestInit);
            const contentType = response.headers.get('content-type');

            if (!response.ok) {
                if (contentType === 'application/json') {
                    return response.json().then(json => {
                        throw new Error(json.error)
                    });
                }

                throw new Error(`Failed to fetch ${endpoint}`);
            }

            switch(contentType) {
                case 'application/json':
                    return response.json();
                case 'image/png':
                    return response.blob();
                default:
                    return response.text();
            }
        })
}
