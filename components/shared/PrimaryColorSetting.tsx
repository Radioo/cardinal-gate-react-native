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
import {StyleSheet, View} from "react-native";
import useTheme from "@/hooks/useTheme";
import {useMemo, useRef, useState} from "react";
import {getMaterialYouAccent} from "@/modules/expo-material-you/src";

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
            <View style={[styles.content, {backgroundColor: theme.background}]}>
                <ColorPicker key={pickerKey} style={styles.picker} value={tempColor.current} onCompleteJS={onSelectColor}>
                    <Preview style={styles.squareCorners}/>
                    <Panel1 style={styles.squareCorners} thumbInnerStyle={styles.thumb} thumbShape="rect"/>
                    <HueSlider style={styles.squareCorners} thumbShape="rect"/>
                    <OpacitySlider style={styles.squareCorners} thumbShape="rect"/>
                </ColorPicker>

                {materialYouAccent && (
                    <ThemedButton label="Use Material You Color" onPress={onMaterialYou} />
                )}

                <View style={styles.buttonRow}>
                    <ThemedButton style={styles.flex1} label="Apply" onPress={() => onCloseModal()}></ThemedButton>
                    <ThemedButton style={styles.flex1} label="Cancel" onPress={() => props.onClose()}></ThemedButton>
                </View>
            </View>
        </ModalBase>
    )
}

const styles = StyleSheet.create({
    content: {width: '70%', padding: 20, gap: 10},
    picker: {gap: 10},
    squareCorners: {borderRadius: 0},
    thumb: {width: 30, height: 30},
    buttonRow: {flexDirection: 'row', gap: 10},
    flex1: {flex: 1},
});
