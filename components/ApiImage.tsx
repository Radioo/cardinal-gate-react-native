import {useQuery} from "@tanstack/react-query";
import {getSecureValue} from "@/store/secure";
import {SecureValue} from "@/enums/secure-value";
import FullScreenLoader from "@/components/FullScreenLoader";
import ErrorScreen from "@/components/ErrorScreen";
import {Image} from "expo-image";
import {memo} from "react";
import {StyleProp} from "react-native";
import {ImageStyle as RNImageStyle} from "react-native/Libraries/StyleSheet/StyleSheetTypes";

type ApiImageProps = {
    url: string;
    contentFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
    style?: StyleProp<RNImageStyle>;
}

const Component = ({url, contentFit, style}: ApiImageProps) => {
    const tokenQuery = useQuery({
        // TODO: Add environment thing here in the future
        queryKey: ['token'],
        queryFn: () => getSecureValue(SecureValue.TOKEN),
        staleTime: Infinity,
    });

    if(tokenQuery.isPending) {
        return <FullScreenLoader/>;
    }

    if(tokenQuery.isError) {
        return <ErrorScreen error={tokenQuery.error} onRetry={tokenQuery.refetch}/>;
    }

    return (
        <Image source={{
            uri: url,
            headers: {
                "CG-Token": tokenQuery.data,
            }
        }}
               contentFit={contentFit}
               style={style}
        />
    )
}

export const ApiImage = memo(Component);
