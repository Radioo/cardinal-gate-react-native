import ModalBase from "@/components/shared/ModalBase";
import {Platform, StyleSheet, TouchableOpacity, View} from "react-native";
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
                                  style={styles.checkboxRow}
                                  activeOpacity={1}
                >
                    <ThemedCheckbox value={isChecked} onValueChange={setIsChecked}></ThemedCheckbox>
                    <ThemedText>
                        I understand that sharing this image in public will result in a ban.
                    </ThemedText>
                </TouchableOpacity> :
                <View style={styles.unavailableContainer}>
                    <ThemedText>Sharing is not available on this platform.</ThemedText>
                </View>}
            <View style={styles.buttonRow}>
                <ThemedButton disabled={!isChecked}
                              loading={isLoading}
                              onPress={onPress}
                              style={styles.flex1}
                              label="Share"
                />
                <ThemedButton style={styles.flex1} label="Close" onPress={onClose}/>
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
            <View style={[styles.content, {backgroundColor: theme.background}]}>
                <ApiImage url={url}
                          style={styles.image}
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

const styles = StyleSheet.create({
    checkboxRow: {flexDirection: 'row', alignItems: 'center', gap: 10, padding: 30},
    unavailableContainer: {padding: 30},
    buttonRow: {padding: 10, flexDirection: 'row', gap: 10, width: '100%'},
    flex1: {flex: 1},
    content: {flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'},
    image: {width: '100%', flex: 1},
});
