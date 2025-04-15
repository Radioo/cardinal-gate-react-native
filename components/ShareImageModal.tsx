import ModalBase from "@/components/ModalBase";
import {Platform, TouchableOpacity, View} from "react-native";
import {ThemedButton} from "@/components/ThemedButton";
import {useTheme} from "@/hooks/useTheme";
import {useState} from "react";
import ThemedCheckbox from "@/components/ThemedCheckbox";
import {ThemedText} from "@/components/ThemedText";
import {useMutation, useQuery} from "@tanstack/react-query";
import * as Sharing from 'expo-sharing';
import FullScreenLoader from "@/components/FullScreenLoader";
import ErrorScreen from "@/components/ErrorScreen";
import * as FileSystem from 'expo-file-system';
import fetchApi2 from "@/services/api2";
import {ApiImage} from "@/components/ApiImage";

export type ShareImageModalProps = {
    url: string;
    modalVisible: boolean;
    onClose: () => void;
}

type BottomSectionProps = {
    onPress: () => void;
    isLoading: boolean;
    onClose: () => void;
    sharingQuery: ReturnType<typeof useQuery>;
}

const BottomSection = ({isLoading, onClose, onPress, sharingQuery}: BottomSectionProps) => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <>
            {sharingQuery.data ?
                <TouchableOpacity onPress={() => setIsChecked(prev => !prev)}
                                  style={{flexDirection: 'row', alignItems: 'center', gap: 10, padding: 30}}
                                  activeOpacity={1}
                >
                    <ThemedCheckbox value={isChecked} onValueChange={setIsChecked}></ThemedCheckbox>
                    <ThemedText>
                        I understand that sharing this image in public will result in a ban.
                    </ThemedText>
                </TouchableOpacity> :
                <View style={{padding: 30}}>
                    <ThemedText>Sharing is not available on this platform.</ThemedText>
                </View>}
            <View style={{padding: 10, flexDirection: 'row', gap: 10, width: '100%'}}>
                <ThemedButton disabled={!isChecked}
                              loading={isLoading}
                              onPress={onPress}
                              style={{flex: 1}}
                              label="Share"
                />
                <ThemedButton style={{flex: 1}} label="Close" onPress={onClose}/>
            </View>
        </>
    )
}

export default function ShareImageModal({url, modalVisible, onClose}: ShareImageModalProps) {
    const theme = useTheme();
    const sharingQuery = useQuery({
        queryKey: ['sharingAvailable'],
        queryFn: Sharing.isAvailableAsync,
        staleTime: Infinity,
    });
    const shareMutation = useMutation({
        mutationFn: async () => {
            let targetUrl = url;

            if(Platform.OS !== 'web') {
                const response = await fetchApi2<Blob>(url, undefined, true);
                targetUrl = FileSystem.cacheDirectory + 'scorecard.png';

                const b64 = await new Promise<string>(((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        resolve(reader.result as string);
                    }
                    reader.onerror = reject;
                    reader.readAsDataURL(response);
                }));
                const b64Data = b64.split(',')[1];

                await FileSystem.writeAsStringAsync(targetUrl, b64Data, {encoding: FileSystem.EncodingType.Base64});
            }

            return Sharing.shareAsync(targetUrl, {
                mimeType: 'image/png',
                UTI: 'image/png',
                dialogTitle: 'Share this scorecard',
            });
        }
    })

    if(sharingQuery.isLoading) {
        return (
            <ModalBase visible={modalVisible}>
                <FullScreenLoader/>
            </ModalBase>
        )
    }

    if(sharingQuery.error) {
        return (
            <ModalBase visible={modalVisible}>
                <ErrorScreen error={sharingQuery.error} onRetry={sharingQuery.refetch}/>
            </ModalBase>
        )
    }

    return (
        <ModalBase visible={modalVisible}>
            <View style={{
                flex: 1,
                backgroundColor: theme.background,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ApiImage url={url}
                          style={{width: '100%', flex: 1}}
                          contentFit="contain"
                />
                <BottomSection onPress={() => shareMutation.mutate()}
                               isLoading={shareMutation.isPending}
                               onClose={onClose}
                               sharingQuery={sharingQuery}
                />
            </View>
        </ModalBase>
    )
}
