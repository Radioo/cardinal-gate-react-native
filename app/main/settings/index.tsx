import {ScrollView, View} from "react-native";
import PrimaryColorSetting from "@/components/PrimaryColorSetting";

export default function Index() {
    return (
        <ScrollView>
            <View style={{margin: 5}}>
                <PrimaryColorSetting/>
            </View>
        </ScrollView>
    )
}
