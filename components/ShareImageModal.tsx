import ModalBase from "@/components/ModalBase";
import {Platform, View} from "react-native";
import {ThemedButton} from "@/components/ThemedButton";
import { Image } from 'expo-image';
import {useTheme} from "@/hooks/useTheme";
import {Checkbox} from "expo-checkbox";
import {useState} from "react";
import ThemedCheckbox from "@/components/ThemedCheckbox";
import {ThemedText} from "@/components/ThemedText";
import {useMutation, useQuery} from "@tanstack/react-query";
import * as Sharing from 'expo-sharing';
import FullScreenLoader from "@/components/FullScreenLoader";
import ErrorScreen from "@/components/ErrorScreen";
import * as FileSystem from 'expo-file-system';

export type ShareImageModalProps = {
    imageB64: string;
    url: string;
    modalVisible: boolean;
    onClose: () => void;
}

export default function ShareImageModal({imageB64, url, modalVisible, onClose}: ShareImageModalProps) {
    const [isChecked, setIsChecked] = useState(false);
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
                const base64 = imageB64.split(',')[1];
                const path = FileSystem.cacheDirectory + 'temp.png';
                await FileSystem.writeAsStringAsync(path, base64, {encoding: FileSystem.EncodingType.Base64});
                targetUrl = path;
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
                <Image source={{uri: imageB64}}
                       style={{width: '100%', flex: 1}}
                       contentFit="contain"
                       transition={1000}
                />
                {sharingQuery.data ?
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, padding: 30}}>
                    <ThemedCheckbox value={isChecked} onValueChange={setIsChecked}></ThemedCheckbox>
                    <ThemedText>
                        I understand that sharing this image in public will result in a ban.
                    </ThemedText>
                </View> :
                <View style={{padding: 30}}>
                    <ThemedText>Sharing is not available on this platform.</ThemedText>
                </View>
                }

                <View style={{padding: 10, flexDirection: 'row', gap: 10}}>
                    <ThemedButton disabled={!isChecked}
                                  loading={shareMutation.isPending}
                                  onPress={() => shareMutation.mutate()}
                                  style={{flex: 1}}
                                  label="Share"
                    />
                    <ThemedButton style={{flex: 1}} label="Close" onPress={onClose}/>
                </View>
            </View>
        </ModalBase>
    )
}
