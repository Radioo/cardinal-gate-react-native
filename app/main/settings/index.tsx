import {FlatList, Pressable, StyleSheet, View} from "react-native";
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
                <Pressable style={[styles.item, index < items.length - 1 && {borderBottomWidth: 1, borderColor: theme.primary}]}
                           android_ripple={{color: theme.primarySurface}}
                           onPress={item.onPress}
                >
                    <View style={styles.row}>
                        {item.icon}
                        <View>
                            <ThemedText style={styles.title}>{item.title}</ThemedText>
                            <ThemedText>{item.description}</ThemedText>
                        </View>
                    </View>
                </Pressable>
            )}>
            </FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {padding: 5},
    row: {flexDirection: 'row', gap: 5, alignItems: 'center'},
    title: {fontSize: 20, fontWeight: 'bold'},
});
