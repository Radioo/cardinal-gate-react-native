import {ScrollView} from "react-native";
import {Button} from "@/components/ui/button";
import {Text} from "@/components/ui/text";
import InlineSpinner from "@/components/shared/InlineSpinner";
import {useState} from "react";
import ShareImageModal from "@/components/shared/ShareImageModal";
import {displayMessage} from "@/lib/notifications";
import {MessageSeverity} from "@/enums/message-severity";

export default function General() {
    const [shareImageModalVisible, setShareImageModalVisible] = useState(false);

    return (
        <ScrollView>
            <ShareImageModal url="https://i.kym-cdn.com/entries/icons/original/000/027/475/Screen_Shot_2018-10-25_at_11.02.15_AM.png"
                             visible={shareImageModalVisible}
                             onClose={() => setShareImageModalVisible(false)}
            />
            <Button className="h-10 px-2.5" onPress={() => setShareImageModalVisible(true)}>
                <Text className="font-bold">Share image</Text>
            </Button>
            <Button className="h-10 px-2.5" disabled>
                <InlineSpinner />
            </Button>
            <Button onPress={() => displayMessage(MessageSeverity.SUCCESS, "Success message")}>
                <Text>Success Toast</Text>
            </Button>
            <Button onPress={() => displayMessage(MessageSeverity.ERROR, "Error message")}>
                <Text>Error Toast</Text>
            </Button>
        </ScrollView>
    )
}
