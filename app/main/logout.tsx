import {router} from "expo-router";
import {clearSession} from "@/services/auth";
import {useEffect} from "react";
import FullScreenLoader from "@/components/shared/feedback/FullScreenLoader";
import {displayMessage} from "@/lib/notifications";
import {MessageSeverity} from "@/enums/message-severity";

export default function Logout() {
    useEffect(() => {
        (async () => {
            try {
                await clearSession();
            } catch (error) {
                displayMessage(MessageSeverity.ERROR, error instanceof Error ? error.message : 'Failed to log out');
            } finally {
                router.replace("/login");
            }
        })();
    }, []);

    return (
        <FullScreenLoader/>
    )
}
