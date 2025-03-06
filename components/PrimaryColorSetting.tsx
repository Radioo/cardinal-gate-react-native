import {ThemedButton} from "@/components/ThemedButton";
import ModalBase from "@/components/ModalBase";
import {useState} from "react";
import {useThemeStore} from "@/store/theme";
import ColorPicker, {
    Panel1,
    Swatches,
    Preview,
    OpacitySlider,
    HueSlider,
    returnedResults
} from 'reanimated-color-picker';

export default function PrimaryColorSetting() {
    const [showPickerModal, setShowPickerModal] = useState(false);
    const {primaryColor, setPrimaryColor} = useThemeStore();
    let tempColor = primaryColor;

    const onSelectColor = ({hex}: returnedResults) => {
        tempColor = hex;
    }

    const onCloseModal = () => {
        setShowPickerModal(false);
        setPrimaryColor(tempColor);
    }

    return (
        <>
            <ThemedButton label="Set primary color" onPress={() => setShowPickerModal(true)}/>

            <ModalBase visible={showPickerModal}>
                <ColorPicker value={tempColor} style={{width: '70%'}} onComplete={onSelectColor}>
                    <Preview/>
                    <Panel1/>
                    <HueSlider/>
                    <OpacitySlider/>
                    <Swatches/>
                </ColorPicker>

                <ThemedButton label="OK" onPress={() => onCloseModal()}></ThemedButton>
            </ModalBase>
        </>
    )
}
