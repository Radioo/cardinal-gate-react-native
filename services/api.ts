import {getSecureValue} from "@/store/secure";
import {SecureValue} from "@/enums/secure-value";
import {displayMessage} from "@/services/message";
import {MessageSeverity} from "@/enums/message-severity";

const fetchApi = async <T>(
    endpoint: string,
    init? : RequestInit,
): Promise<T> => {
    const url = `${process.env.EXPO_PUBLIC_API_URL}${endpoint}`;

    return getSecureValue(SecureValue.TOKEN).catch(() => {
        displayMessage(MessageSeverity.ERROR, 'Failed to read token');
        return Promise.reject();
    }).then(token => {
        let headers: any = {};

        if(token !== null) {
            headers['CG-Token'] = token;
        }

        const requestInit = {
            ...init,
            headers: {
                ...init?.headers,
                ...headers,
            },
        }

        return fetch(url, requestInit);
    }).catch(() => {
        displayMessage(MessageSeverity.ERROR, `Request failed for ${url}`);
        return Promise.reject();
    }).then(async response => {
        if (response.ok) {
            return response.json();
        }

        let errorText = 'Unknown error';
        if (response.headers.get('content-type') === 'application/json') {
            const json = await response.json();
            errorText = json.error;
        }

        displayMessage(MessageSeverity.ERROR, errorText);
        return Promise.reject();
    });
}

export default fetchApi;
