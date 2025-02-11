import {Modal, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {ThemedTextInput} from "@/components/ThemedTextInput";
import {ThemedButton} from "@/components/ThemedButton";
import {useTheme} from "@/hooks/useTheme";
import {useEffect, useState} from "react";

export type SetPageModalProps = {
    initialValue?: string;
    modalVisible: boolean;
    onClose: (page: number) => void;
    maxPage: number;
}

export default function SetPageModal({initialValue, modalVisible, onClose, maxPage}: SetPageModalProps) {
    const theme = useTheme();
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return (
        <Modal animationType="slide"
               visible={modalVisible}
               transparent={true}
               style={{
                   backgroundColor: 'red'
               }}
        >
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{padding: 20, backgroundColor: theme.background, gap: 10}}>
                    <ThemedText>Set page</ThemedText>
                    <ThemedTextInput defaultValue={initialValue}
                                     onChangeText={text => setValue(text)}
                                     keyboardType="numeric"
                    />
                    <ThemedButton aria-valuemin={1} label="OK" onPress={() => {
                        let result = parseInt(value ?? '1');
                        result = result < 1 ? 1 : result;
                        result = result > maxPage ? maxPage : result;
                        onClose(result);
                    }}/>
                </View>
            </View>
        </Modal>
    )
}
