import {View, StyleSheet} from "react-native";
import ThemedText from "@/components/themed/ThemedText";
import ThemedTextInput from "@/components/themed/ThemedTextInput";
import ThemedButton from "@/components/themed/ThemedButton";
import useTheme from "@/hooks/useTheme";
import {useEffect, useState} from "react";
import ModalBase from "@/components/shared/ModalBase";

type SetPageModalProps = {
    initialValue?: string;
    visible: boolean;
    onClose: (page: number) => void;
    maxPage: number;
};

export default function SetPageModal({
                                         initialValue,
                                         visible,
                                         onClose,
                                         maxPage,
                                     }: SetPageModalProps) {
    const theme = useTheme();
    const [value, setValue] = useState(initialValue ?? '1');

    useEffect(() => {
        if (initialValue !== undefined) {
            setValue(initialValue);
        }
    }, [initialValue]);

    return (
        <ModalBase visible={visible}>
            <View style={styles.modalContainer}>
                <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
                    <ThemedText>Set page</ThemedText>
                    <ThemedTextInput
                        value={value}
                        onChangeText={setValue}
                        keyboardType="numeric"
                    />
                    <ThemedButton
                        aria-valuemin={1}
                        label="OK"
                        onPress={() => {
                            const result = Math.max(1, Math.min(maxPage, parseInt(value) || 1));
                            onClose(result);
                        }}
                    />
                </View>
            </View>
        </ModalBase>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        padding: 20,
        gap: 10,
        borderRadius: 10,
    },
});
