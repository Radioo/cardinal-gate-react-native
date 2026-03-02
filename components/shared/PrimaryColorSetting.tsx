import ThemedButton from "@/components/themed/ThemedButton";
import ModalBase from "@/components/shared/ModalBase";
import {useThemeStore} from "@/store/theme";
import ColorPicker, {
    Panel1,
    Preview,
    OpacitySlider,
    HueSlider,
    returnedResults
} from 'reanimated-color-picker';
import {StyleSheet, View} from "react-native";
import useTheme from "@/hooks/useTheme";
import {useRef} from "react";

type PrimaryColorSettingProps = {
    visible: boolean;
    onClose: () => void;
}

export default function PrimaryColorSetting(props: PrimaryColorSettingProps) {
    const theme = useTheme();
    const {primaryColor, setPrimaryColor} = useThemeStore();
    const tempColor = useRef(primaryColor);

    const onSelectColor = ({hex}: returnedResults) => {
        tempColor.current = hex;
    }

    const onCloseModal = () => {
        setPrimaryColor(tempColor.current);
        props.onClose();
    }

    return (
        <ModalBase visible={props.visible}>
            <View style={[styles.content, {backgroundColor: theme.background}]}>
                <ColorPicker style={styles.picker} value={tempColor.current} onComplete={onSelectColor}>
                    <Preview style={styles.squareCorners}/>
                    <Panel1 style={styles.squareCorners} thumbInnerStyle={styles.thumb} thumbShape="rect"/>
                    <HueSlider style={styles.squareCorners} thumbShape="rect"/>
                    <OpacitySlider style={styles.squareCorners} thumbShape="rect"/>
                </ColorPicker>

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
