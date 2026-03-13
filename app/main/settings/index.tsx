import {FlatList, Pressable, View} from "react-native";
import PrimaryColorSetting from "@/components/shared/PrimaryColorSetting";
import ThemedText from "@/components/themed/ThemedText";
import useTheme from "@/hooks/useTheme";
import {useState} from "react";
import {Ionicons} from "@expo/vector-icons";

export default function Index() {
    const [colorPickerVisible, setColorPickerVisible] = useState(false);
    const theme = useTheme();

    const items = [
        {
            id: 1,
            title: "Primary Color",
            description: "Change the primary color of the app",
            onPress: () => setColorPickerVisible(true),
            icon: <Ionicons name="color-fill-sharp" size={40} color={theme.primary} />
        },
    ]

    return (
        <View>
            <PrimaryColorSetting visible={colorPickerVisible} onClose={() => setColorPickerVisible(false)}/>
            <FlatList data={items} renderItem={({item, index}) => (
                <Pressable className="p-[5px]"
                           style={index < items.length - 1 ? {borderBottomWidth: 1, borderColor: theme.primary} : undefined}
                           android_ripple={{color: theme.primarySurface}}
                           onPress={item.onPress}
                >
                    <View className="flex-row gap-[5px] items-center">
                        {item.icon}
                        <View>
                            <ThemedText className="text-xl font-bold">{item.title}</ThemedText>
                            <ThemedText>{item.description}</ThemedText>
                        </View>
                    </View>
                </Pressable>
            )}>
            </FlatList>
        </View>
    )
}
