import {View} from "react-native";
import {Text} from "@/components/ui/text";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import useTheme from "@/hooks/useTheme";
import {useState} from "react";
import ModalBase from "@/components/shared/modal/ModalBase";

type SetPageModalProps = {
    initialValue: string;
    visible: boolean;
    onSubmit: (page: number) => void;
    maxPage: number;
};

function SetPageModalBody({
                              initialValue,
                              onSubmit,
                              maxPage,
                          }: Omit<SetPageModalProps, "visible">) {
    const theme = useTheme();
    const [value, setValue] = useState(initialValue);

    return (
        <View className="w-full p-5 gap-2.5" style={{backgroundColor: theme.background}}>
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
                    const parsed = parseInt(value, 10);
                    const safe = Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
                    onSubmit(Math.max(1, Math.min(maxPage, safe)));
                }}
            >
                <Text className="font-bold">OK</Text>
            </Button>
        </View>
    );
}

export default function SetPageModal({initialValue, visible, onSubmit, maxPage}: SetPageModalProps) {
    return (
        <ModalBase visible={visible}>
            <SetPageModalBody
                key={initialValue}
                initialValue={initialValue}
                onSubmit={onSubmit}
                maxPage={maxPage}
            />
        </ModalBase>
    );
}
