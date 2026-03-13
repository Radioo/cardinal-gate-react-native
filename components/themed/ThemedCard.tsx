import {StyleProp, ViewStyle} from "react-native";
import React from "react";
import {Card} from "@/components/ui/card";
import {cn} from "@/lib/utils";

interface ThemedCardProps {
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    className?: string;
}

export default function ThemedCard({children, style, className}: ThemedCardProps) {
    return (
        <Card
            className={cn(
                "border-primary bg-primary-surface gap-0 rounded-none p-1.5 shadow-none",
                className
            )}
            style={style}
        >
            {children}
        </Card>
    );
}
