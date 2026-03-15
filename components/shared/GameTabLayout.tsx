import {Tabs} from "expo-router";
import useTheme from "@/hooks/useTheme";
import {User, List} from "lucide-react-native";
import {TAB_BAR_LABEL_STYLE} from "@/constants/styles";
import GradientBackground from "@/components/shared/GradientBackground";
import {View} from "react-native";

type Tab = {
    name: string;
    title?: string;
    icon: (color: string) => React.ReactNode;
}

const DEFAULT_TABS: Tab[] = [
    {
        name: "Profile",
        icon: (color) => <User size={24} color={color} />,
    },
    {
        name: "Plays",
        icon: (color) => <List size={24} color={color} />,
    },
];

type GameTabLayoutProps = {
    tabs?: Tab[];
}

export default function GameTabLayout({tabs = DEFAULT_TABS}: GameTabLayoutProps) {
    const theme = useTheme();

    return (
        <Tabs
            screenLayout={({children}) => (
                <View style={{flex: 1, backgroundColor: theme.background}}>
                    <GradientBackground />
                    {children}
                </View>
            )}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.primary,
                tabBarLabelStyle: TAB_BAR_LABEL_STYLE,
            }}
        >
            {tabs.map(tab => (
                <Tabs.Screen key={tab.name} name={tab.name} options={{
                    title: tab.title,
                    tabBarIcon: ({color}) => tab.icon(color)
                }}/>
            ))}
        </Tabs>
    )
}
