import ModalBase from "@/components/shared/ModalBase";
import {Platform, TouchableOpacity, View} from "react-native";
import ThemedButton from "@/components/themed/ThemedButton";
import useTheme from "@/hooks/useTheme";
import {useState} from "react";
import ThemedCheckbox from "@/components/themed/ThemedCheckbox";
import ThemedText from "@/components/themed/ThemedText";
import {useMutation, useQuery} from "@tanstack/react-query";
import * as Sharing from 'expo-sharing';
import FullScreenLoader from "@/components/shared/FullScreenLoader";
import ErrorScreen from "@/components/shared/ErrorScreen";
import {downloadToLocalFile} from "@/services/image";
import ApiImage from "@/components/shared/ApiImage";

type ShareImageModalProps = {
    url: string;
    visible: boolean;
    onClose: () => void;
}

type BottomSectionProps = {
    onPress: () => void;
    isLoading: boolean;
    onClose: () => void;
    sharingAvailable: boolean;
}

const BottomSection = ({isLoading, onClose, onPress, sharingAvailable}: BottomSectionProps) => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <>
            {sharingAvailable ?
                <TouchableOpacity onPress={() => setIsChecked(prev => !prev)}
                                  className="flex-row items-center gap-2.5 p-[30px]"
                                  activeOpacity={1}
                >
                    <ThemedCheckbox value={isChecked} onValueChange={setIsChecked}></ThemedCheckbox>
                    <ThemedText>
                        I understand that sharing this image in public will result in a ban.
                    </ThemedText>
                </TouchableOpacity> :
                <View className="p-[30px]">
                    <ThemedText>Sharing is not available on this platform.</ThemedText>
                </View>}
            <View className="p-2.5 flex-row gap-2.5 w-full">
                <ThemedButton disabled={!isChecked}
                              loading={isLoading}
                              onPress={onPress}
                              className="flex-1"
                              label="Share"
                />
                <ThemedButton className="flex-1" label="Close" onPress={onClose}/>
            </View>
        </>
    )
}

export default function ShareImageModal({url, visible, onClose}: ShareImageModalProps) {
    const theme = useTheme();
    const sharingQuery = useQuery({
        queryKey: ['sharingAvailable'],
        queryFn: Sharing.isAvailableAsync,
        staleTime: Infinity,
    });
    const shareMutation = useMutation({
        mutationFn: async () => {
            const targetUrl = Platform.OS !== 'web'
                ? await downloadToLocalFile(url, 'scorecard.png')
                : url;

            return Sharing.shareAsync(targetUrl, {
                mimeType: 'image/png',
                UTI: 'image/png',
                dialogTitle: 'Share this scorecard',
            });
        }
    })

    if(sharingQuery.isPending) {
        return (
            <ModalBase visible={visible}>
                <FullScreenLoader/>
            </ModalBase>
        )
    }

    if(sharingQuery.error) {
        return (
            <ModalBase visible={visible}>
                <ErrorScreen error={sharingQuery.error} onRetry={sharingQuery.refetch}/>
            </ModalBase>
        )
    }

    return (
        <ModalBase visible={visible}>
            <View className="flex-1 w-full justify-center items-center" style={{backgroundColor: theme.background}}>
                <ApiImage url={url}
                          style={{width: '100%', flex: 1}}
                          contentFit="contain"
                />
                <BottomSection onPress={() => shareMutation.mutate()}
                               isLoading={shareMutation.isPending}
                               onClose={onClose}
                               sharingAvailable={!!sharingQuery.data}
                />
            </View>
        </ModalBase>
    )
}
