import {Redirect} from 'expo-router';
import {getSecureValue} from "@/services/secure-storage";
import {SecureValue} from "@/enums/secure-value";
import {useEffect, useState} from "react";
import FullScreenLoader from "@/components/shared/FullScreenLoader";

export default function Root() {
    const [loading, setLoading] = useState(true);
    const [hasToken, setHasToken] = useState(false);

    useEffect(() => {
        getSecureValue(SecureValue.TOKEN)
            .then(token => setHasToken(token !== null))
            .catch((error) => {
                console.error('Failed to read secure storage:', error);
                setHasToken(false);
            })
            .finally(() => setLoading(false));
    }, []);

    if(loading) {
        return <FullScreenLoader></FullScreenLoader>;
    }

    if(hasToken) {
        return <Redirect href="/main/Home" />;
    }

    return <Redirect href="/login" />;
}
