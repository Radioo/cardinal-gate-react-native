import FullScreenLoader from "@/components/shared/FullScreenLoader";
import ErrorScreen from "@/components/shared/ErrorScreen";
import {Image} from "expo-image";
import {memo} from "react";
import {ImageStyle, StyleProp} from "react-native";
import useAuthHeaders from "@/hooks/useAuthHeaders";

type ApiImageProps = {
    url: string;
    contentFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
    style?: StyleProp<ImageStyle>;
}

/**
 * Image component for auth-gated API endpoints.
 * Manages its own auth header query — callers should expect
 * loading/error states while headers are being resolved.
 */

const ApiImageInner =({url, contentFit, style}: ApiImageProps) => {
    const headersQuery = useAuthHeaders();

    if (headersQuery.isPending) {
        return <FullScreenLoader/>;
    }

    if (headersQuery.isError) {
        return <ErrorScreen error={headersQuery.error} onRetry={headersQuery.refetch}/>;
    }

    return (
        <Image source={{
            uri: url,
            headers: headersQuery.data,
        }}
               contentFit={contentFit}
               style={style}
        />
    )
}

export default memo(ApiImageInner);
