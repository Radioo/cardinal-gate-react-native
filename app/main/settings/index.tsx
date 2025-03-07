import {FlatList, Pressable, ScrollView, View} from "react-native";
import PrimaryColorSetting from "@/components/PrimaryColorSetting";
import {ThemedText} from "@/components/ThemedText";
import {useTheme} from "@/hooks/useTheme";
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
        {
            id: 2,
            title: "Other setting",
            description: "Change the other setting",
        }
    ]

    return (
        <View>
            <PrimaryColorSetting visible={colorPickerVisible} onClose={() => setColorPickerVisible(false)}/>
            <FlatList data={items} renderItem={({item, index}) => (
                <Pressable style={{
                    borderBottomWidth: index === items.length - 1 ? 0 : 1,
                    borderColor: theme.primary,
                    padding: 5,
                }}
                           android_ripple={{color: theme.primarySurface}}
                           onPress={item.onPress}
                >
                    <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                        {item.icon}
                        <View>
                            <ThemedText style={{fontSize: 20, fontWeight: 'bold'}}>{item.title}</ThemedText>
                            <ThemedText>{item.description}</ThemedText>
                        </View>
                    </View>
                </Pressable>
            )}>
            </FlatList>
        </View>
    )
}
