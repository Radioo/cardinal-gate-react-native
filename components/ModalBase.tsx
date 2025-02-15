import {Modal, Platform, SafeAreaView} from "react-native";
import React from "react";
import {BlurView} from "expo-blur";
import {useTheme} from "@/hooks/useTheme";
import {SafeAreaProvider} from "react-native-safe-area-context";

export type ModalBaseProps = {
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
                    <BlurView style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
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
