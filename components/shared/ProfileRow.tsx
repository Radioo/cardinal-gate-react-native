import {ReactNode} from "react";
import {StyleSheet} from "react-native";
import ThemedCard from "@/components/themed/ThemedCard";
import ThemedText from "@/components/themed/ThemedText";

type ProfileRowProps = {
    icon: ReactNode;
    label: string;
    value: ReactNode;
};

export default function ProfileRow({icon, label, value}: ProfileRowProps) {
    return (
        <ThemedCard style={styles.card}>
            {icon}
            <ThemedText style={styles.label}>{label}</ThemedText>
            {typeof value === 'string' ? <ThemedText>{value}</ThemedText> : value}
        </ThemedCard>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        margin: 5,
    },
    label: {
        marginRight: 'auto',
    },
});
