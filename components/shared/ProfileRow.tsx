import {ReactNode} from "react";
import {Card} from "@/components/ui/card";
import {Text} from "@/components/ui/text";

type ProfileRowProps = {
    icon: ReactNode;
    label: string;
    value: ReactNode;
};

export default function ProfileRow({icon, label, value}: ProfileRowProps) {
    return (
        <Card className="border-primary bg-primary-surface rounded-none p-1.5 flex-row items-center gap-1.5 m-1.5">
            {icon}
            <Text className="text-base leading-6 mr-auto">{label}</Text>
            {typeof value === 'string' ? <Text className="text-base leading-6">{value}</Text> : value}
        </Card>
    );
}
