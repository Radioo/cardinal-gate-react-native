import FullScreenLoader from "@/components/shared/feedback/FullScreenLoader";
import ErrorScreen from "@/components/shared/feedback/ErrorScreen";
import {Image} from "expo-image";
import {memo} from "react";
import {ImageStyle, StyleProp} from "react-native";
import useAuthHeaders from "@/hooks/queries/useAuthHeaders";
import {isApiOrigin} from "@/services/url";

type ApiImageProps = {
    url: string;
    contentFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
    style?: StyleProp<ImageStyle>;
}

/**
 * Image component for auth-gated API endpoints.
 * Manages its own auth header query — callers should expect
 * loading/error states while headers are being resolved.
 * The auth header is only attached to same-origin URLs (see isApiOrigin)
 * so tokens are never leaked to third-party image hosts.
 */

const ApiImageInner =({url, contentFit, style}: ApiImageProps) => {
    const headersQuery = useAuthHeaders();
    const needsAuth = isApiOrigin(url);

    if (needsAuth && headersQuery.isPending) {
        return <FullScreenLoader/>;
    }

    if (needsAuth && headersQuery.isError) {
        return <ErrorScreen error={headersQuery.error} onRetry={headersQuery.refetch}/>;
    }

    return (
        <Image source={{
            uri: url,
            headers: needsAuth ? headersQuery.data : undefined,
        }}
               contentFit={contentFit}
               style={style}
        />
    )
}

export default memo(ApiImageInner);
