import React from "react";
import {Dialog, DialogContent} from "@/components/ui/dialog";
import usePrimaryColorVars from "@/hooks/usePrimaryColorVars";

type ModalBaseProps = {
    children: React.ReactNode;
    visible: boolean;
}

export default function ModalBase({children, visible}: ModalBaseProps) {
    const dynamicVars = usePrimaryColorVars();

    return (
        <Dialog open={visible}>
            <DialogContent style={dynamicVars}>
                {children}
            </DialogContent>
        </Dialog>
    )
}
