import {Modal, Platform, SafeAreaView, StyleSheet} from "react-native";
import React from "react";
import {BlurView} from "expo-blur";
import useTheme from "@/hooks/useTheme";
import {SafeAreaProvider} from "react-native-safe-area-context";

type ModalBaseProps = {
    children: React.ReactNode;
    visible: boolean;
}

export default function ModalBase({children, visible}: ModalBaseProps) {
    const theme = useTheme();

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <Modal animationType="fade"
                       visible={visible}
                       transparent={true}
                >
                    <BlurView style={styles.blurView}
                              intensity={10}
                              tint={theme.scheme}
                              experimentalBlurMethod={Platform.OS === 'android' ? 'dimezisBlurView' : 'none'}
                    >
                        {children}
                    </BlurView>
                </Modal>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    blurView: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
