import ThemedButton from "@/components/themed/ThemedButton";
import ModalBase from "@/components/shared/ModalBase";
import {useThemeStore} from "@/store/theme";
import ColorPicker, {
    Panel1,
    Preview,
    OpacitySlider,
    HueSlider,
} from 'reanimated-color-picker';
import type {ColorFormatsObject} from 'reanimated-color-picker';
import {View} from "react-native";
import useTheme from "@/hooks/useTheme";
import {useMemo, useRef, useState} from "react";
import {getMaterialYouAccent} from "@/modules/expo-material-you/src";

const squareCorners = {borderRadius: 0};
const thumbStyle = {width: 30, height: 30};
const pickerStyle = {gap: 10};

function useMaterialYouAccent(): string | null {
    return useMemo(() => {
        try { return getMaterialYouAccent(); }
        catch { return null; }
    }, []);
}

type PrimaryColorSettingProps = {
    visible: boolean;
    onClose: () => void;
}

export default function PrimaryColorSetting(props: PrimaryColorSettingProps) {
    const theme = useTheme();
    const {primaryColor, setPrimaryColor} = useThemeStore();
    const tempColor = useRef(primaryColor);
    const [pickerKey, setPickerKey] = useState(0);
    const materialYouAccent = useMaterialYouAccent();

    const onSelectColor = ({hex}: ColorFormatsObject) => {
        tempColor.current = hex;
    }

    const onCloseModal = () => {
        setPrimaryColor(tempColor.current);
        props.onClose();
    }

    const onMaterialYou = () => {
        if (!materialYouAccent) return;
        tempColor.current = materialYouAccent;
        setPickerKey(k => k + 1);
    }

    return (
        <ModalBase visible={props.visible}>
            <View className="w-[70%] p-5 gap-2.5" style={{backgroundColor: theme.background}}>
                <ColorPicker key={pickerKey} style={pickerStyle} value={tempColor.current} onCompleteJS={onSelectColor}>
                    <Preview style={squareCorners}/>
                    <Panel1 style={squareCorners} thumbInnerStyle={thumbStyle} thumbShape="rect"/>
                    <HueSlider style={squareCorners} thumbShape="rect"/>
                    <OpacitySlider style={squareCorners} thumbShape="rect"/>
                </ColorPicker>

                {materialYouAccent && (
                    <ThemedButton label="Use Material You Color" onPress={onMaterialYou} />
                )}

                <View className="flex-row gap-2.5">
                    <ThemedButton className="flex-1" label="Apply" onPress={() => onCloseModal()}></ThemedButton>
                    <ThemedButton className="flex-1" label="Cancel" onPress={() => props.onClose()}></ThemedButton>
                </View>
            </View>
        </ModalBase>
    )
}
