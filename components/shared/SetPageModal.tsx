import {View} from "react-native";
import {Text} from "@/components/ui/text";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
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
            <View className="flex-1 justify-center items-center">
                <View className="p-5 gap-2.5 rounded-none" style={{backgroundColor: theme.background}}>
                    <Text className="text-base leading-6">Set page</Text>
                    <Input
                        className="border-primary"
                        value={value}
                        onChangeText={setValue}
                        keyboardType="numeric"
                    />
                    <Button
                        className="h-10 px-2.5"
                        aria-valuemin={1}
                        onPress={() => {
                            const result = Math.max(1, Math.min(maxPage, parseInt(value) || 1));
                            onClose(result);
                        }}
                    >
                        <Text className="font-bold">OK</Text>
                    </Button>
                </View>
            </View>
        </ModalBase>
    );
}
