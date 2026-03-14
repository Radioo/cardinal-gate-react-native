import {FlatList, Pressable, View} from "react-native";
import PrimaryColorSetting from "@/components/shared/PrimaryColorSetting";
import {Text} from "@/components/ui/text";
import useTheme from "@/hooks/useTheme";
import {useState} from "react";
import {Paintbrush} from "lucide-react-native";

export default function Index() {
    const [colorPickerVisible, setColorPickerVisible] = useState(false);
    const theme = useTheme();

    const items = [
        {
            id: 1,
            title: "Primary Color",
            description: "Change the primary color of the app",
            onPress: () => setColorPickerVisible(true),
            icon: <Paintbrush size={40} color={theme.primary} />
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
                            <Text className="text-xl font-bold">{item.title}</Text>
                            <Text className="text-base leading-6">{item.description}</Text>
                        </View>
                    </View>
                </Pressable>
            )}>
            </FlatList>
        </View>
    )
}
