import {Button} from "@/components/ui/button";
import {Text} from "@/components/ui/text";
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
        catch (e) { console.warn('Material You accent unavailable:', e); return null; }
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

    const onApplyAndClose = () => {
        setPrimaryColor(tempColor.current);
        props.onClose();
    }

    const onApplyMaterialYou = () => {
        if (!materialYouAccent) return;
        tempColor.current = materialYouAccent;
        setPickerKey(k => k + 1);
    }

    return (
        <ModalBase visible={props.visible}>
            <View className="w-full p-5 gap-2.5" style={{backgroundColor: theme.background}}>
                <ColorPicker key={pickerKey} style={pickerStyle} value={tempColor.current} onCompleteJS={onSelectColor}>
                    <Preview style={squareCorners}/>
                    <Panel1 style={squareCorners} thumbInnerStyle={thumbStyle} thumbShape="rect"/>
                    <HueSlider style={squareCorners} thumbShape="rect"/>
                    <OpacitySlider style={squareCorners} thumbShape="rect"/>
                </ColorPicker>

                {materialYouAccent && (
                    <Button className="h-10 px-2.5" onPress={onApplyMaterialYou}>
                        <Text className="font-bold">Use Material You Color</Text>
                    </Button>
                )}

                <View className="flex-row gap-2.5">
                    <Button className="flex-1 h-10 px-2.5" onPress={() => onApplyAndClose()}>
                        <Text className="font-bold">Apply</Text>
                    </Button>
                    <Button className="flex-1 h-10 px-2.5" onPress={() => props.onClose()}>
                        <Text className="font-bold">Cancel</Text>
                    </Button>
                </View>
            </View>
        </ModalBase>
    )
}
