import {Redirect} from 'expo-router';
import {getSecureValue} from "@/services/secure-storage";
import {SecureValue} from "@/enums/secure-value";
import {useCallback, useEffect, useState} from "react";
import FullScreenLoader from "@/components/shared/FullScreenLoader";
import ErrorScreen from "@/components/shared/ErrorScreen";

export default function Root() {
    const [loading, setLoading] = useState(true);
    const [hasToken, setHasToken] = useState(false);
    const [storageError, setStorageError] = useState<Error | null>(null);

    const checkToken = useCallback(() => {
        setLoading(true);
        setStorageError(null);
        getSecureValue(SecureValue.TOKEN)
            .then(token => setHasToken(token !== null))
            .catch((error) => {
                setStorageError(error instanceof Error ? error : new Error(String(error)));
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        checkToken();
    }, [checkToken]);

    if(loading) {
        return <FullScreenLoader></FullScreenLoader>;
    }

    if(storageError) {
        return <ErrorScreen error={storageError} onRetry={checkToken}/>;
    }

    if(hasToken) {
        return <Redirect href="/main/Home" />;
    }

    return <Redirect href="/login" />;
}
