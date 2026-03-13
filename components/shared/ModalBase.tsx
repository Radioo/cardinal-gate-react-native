import {useColorScheme} from "react-native";
import React, {useMemo} from "react";
import {Dialog, DialogContent} from "@/components/ui/dialog";
import {useThemeStore} from "@/store/theme";
import {hexToHslVar, lightenToHslVar, darkenToHslVar} from "@/lib/color-utils";
import {vars} from "nativewind";

type ModalBaseProps = {
    children: React.ReactNode;
    visible: boolean;
}

export default function ModalBase({children, visible}: ModalBaseProps) {
    const {primaryColor} = useThemeStore();
    const isDark = useColorScheme() === 'dark';

    const dynamicVars = useMemo(() => vars({
        '--primary': hexToHslVar(primaryColor),
        '--primary-surface': isDark
            ? darkenToHslVar(primaryColor, 0.4)
            : lightenToHslVar(primaryColor, 0.4),
        '--input': hexToHslVar(primaryColor),
        '--ring': hexToHslVar(primaryColor),
    }), [primaryColor, isDark]);

    return (
        <Dialog open={visible}>
            <DialogContent style={dynamicVars}>
                {children}
            </DialogContent>
        </Dialog>
    )
}
