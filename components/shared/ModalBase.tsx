import {useColorScheme} from "react-native";
import React, {useMemo} from "react";
import {Dialog, DialogContent} from "@/components/ui/dialog";
import {useThemeStore} from "@/store/theme";
import {buildPrimaryColorVars} from "@/lib/color-utils";
import {vars} from "nativewind";

type ModalBaseProps = {
    children: React.ReactNode;
    visible: boolean;
}

export default function ModalBase({children, visible}: ModalBaseProps) {
    const {primaryColor} = useThemeStore();
    const isDark = useColorScheme() === 'dark';

    const dynamicVars = useMemo(
        () => vars(buildPrimaryColorVars(primaryColor, isDark)),
        [primaryColor, isDark],
    );

    return (
        <Dialog open={visible}>
            <DialogContent style={dynamicVars}>
                {children}
            </DialogContent>
        </Dialog>
    )
}
