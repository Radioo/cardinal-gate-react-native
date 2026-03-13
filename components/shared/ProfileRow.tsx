import {ReactNode} from "react";
import ThemedCard from "@/components/themed/ThemedCard";
import ThemedText from "@/components/themed/ThemedText";

type ProfileRowProps = {
    icon: ReactNode;
    label: string;
    value: ReactNode;
};

export default function ProfileRow({icon, label, value}: ProfileRowProps) {
    return (
        <ThemedCard className="flex-row items-center gap-1.5 m-1.5">
            {icon}
            <ThemedText className="mr-auto">{label}</ThemedText>
            {typeof value === 'string' ? <ThemedText>{value}</ThemedText> : value}
        </ThemedCard>
    );
}
