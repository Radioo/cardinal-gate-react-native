import {ThemedButton} from "@/components/ThemedButton";
import ModalBase from "@/components/ModalBase";
import {useThemeStore} from "@/store/theme";
import ColorPicker, {
    Panel1,
    Preview,
    OpacitySlider,
    HueSlider,
    returnedResults
} from 'reanimated-color-picker';
import {View} from "react-native";
import {useTheme} from "@/hooks/useTheme";

type PrimaryColorSettingProps = {
    visible: boolean;
    onClose: () => void;
}

export default function PrimaryColorSetting(props: PrimaryColorSettingProps) {
    const theme = useTheme();
    const {primaryColor, setPrimaryColor} = useThemeStore();
    let tempColor = primaryColor;

    const onSelectColor = ({hex}: returnedResults) => {
        tempColor = hex;
    }

    const onCloseModal = () => {
        setPrimaryColor(tempColor);
        props.onClose();
    }

    return (
        <ModalBase visible={props.visible}>
            <View style={{width: '70%', padding: 20, backgroundColor: theme.background, gap: 10}}>
                <ColorPicker style={{gap: 10}} value={tempColor} onComplete={onSelectColor}>
                    <Preview style={{borderRadius: 0}}/>
                    <Panel1 style={{borderRadius: 0}} thumbInnerStyle={{width: 30, height: 30}} thumbShape="rect"/>
                    <HueSlider style={{borderRadius: 0}} thumbShape="rect"/>
                    <OpacitySlider style={{borderRadius: 0}} thumbShape="rect"/>
                </ColorPicker>

                <View style={{flexDirection: 'row', gap: 10}}>
                    <ThemedButton style={{flex: 1}} label="Apply" onPress={() => onCloseModal()}></ThemedButton>
                    <ThemedButton style={{flex: 1}} label="Cancel" onPress={() => props.onClose()}></ThemedButton>
                </View>
            </View>
        </ModalBase>
    )
}
