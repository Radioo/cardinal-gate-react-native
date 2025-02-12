import {Modal, View, StyleSheet, Platform} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedButton } from "@/components/ThemedButton";
import { useTheme } from "@/hooks/useTheme";
import { useEffect, useState } from "react";
import { BlurView } from "expo-blur";

export type SetPageModalProps = {
    initialValue?: string;
    modalVisible: boolean;
    onClose: (page: number) => void;
    maxPage: number;
};

export default function SetPageModal({
                                         initialValue,
                                         modalVisible,
                                         onClose,
                                         maxPage,
                                     }: SetPageModalProps) {
    const theme = useTheme();
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return (
        <Modal
            animationType="fade"
            visible={modalVisible}
            transparent={true}
        >
            <BlurView
                style={styles.blurContainer}
                intensity={10}
                tint={theme.scheme}
                experimentalBlurMethod={Platform.OS === 'android' ? 'dimezisBlurView' : 'none'}
            >
                <View style={styles.modalContainer}>
                    <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
                        <ThemedText>Set page</ThemedText>
                        <ThemedTextInput
                            defaultValue={initialValue}
                            onChangeText={(text) => setValue(text)}
                            keyboardType="numeric"
                        />
                        <ThemedButton
                            aria-valuemin={1}
                            label="OK"
                            onPress={() => {
                                let result = parseInt(value ?? "1");
                                result = result < 1 ? 1 : result;
                                result = result > maxPage ? maxPage : result;
                                onClose(result);
                            }}
                        />
                    </View>
                </View>
            </BlurView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    blurContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        padding: 20,
        gap: 10,
        borderRadius: 10, // Optional: Add rounded corners
    },
});
