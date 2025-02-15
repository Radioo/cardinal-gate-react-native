import {ScrollView} from "react-native";
import {ThemedButton} from "@/components/ThemedButton";
import { useState } from "react";
import ShareImageModal from "@/components/ShareImageModal";

export default function General() {
    const [shareImageModalVisible, setShareImageModalVisible] = useState(false);

    return (
        <ScrollView>
            <ShareImageModal url="https://i.kym-cdn.com/entries/icons/original/000/027/475/Screen_Shot_2018-10-25_at_11.02.15_AM.png"
                             modalVisible={shareImageModalVisible}
                             onClose={() => setShareImageModalVisible(false)}
            />
            <ThemedButton label="Share image" onPress={() => setShareImageModalVisible(true)}/>
        </ScrollView>
    )
}
