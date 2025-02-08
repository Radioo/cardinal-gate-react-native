import {UserData} from "@/types/user-data";
import {create} from "zustand";
import {clearSecureValue, getSecureValue} from "@/store/secure";
import {SecureValue} from "@/enums/secure-value";
import {useEffect, useState} from "react";
import {displayMessage} from "@/services/message";
import {MessageSeverity} from "@/enums/message-severity";
import {router} from "expo-router";

interface UserDataStore {
    data: UserData | null;
    set: (data: UserData | null) => void;
}

const useUserDataStore = create<UserDataStore>()((set) => ({
    data: null,
    set: (data) => set({ data }),
}));

interface UseUserDataResult {
    data: UserData | null;
    loading: boolean;
    clear: () => void;
    reload: () => void;
}

export function useUserData(): UseUserDataResult {
    const { data, set } = useUserDataStore();
    const [loading, setLoading] = useState<boolean>(true);
    const [reloadFlag, setReloadFlag] = useState(false);

    const loadUserData = async () => {
        setLoading(true);

        try {
            const token = await getSecureValue(SecureValue.TOKEN);
            if (!token) {
                displayMessage(MessageSeverity.ERROR, 'Token not found');
                router.replace('/login');
                return;
            }

            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/me`, {
                headers: {
                    "CG-Token": token
                },
            });

            if (!response.ok) {
                displayMessage(MessageSeverity.ERROR, 'Failed to fetch user data');
                setLoading(false);
                return;
            }

            const userData: UserData = await response.json();
            set(userData);
        } catch (err) {
            displayMessage(MessageSeverity.ERROR, 'Failed to fetch user data');
        } finally {
            setLoading(false);
        }
    };

    // Use useEffect to load data when the component mounts or reloadFlag changes
    useEffect(() => {
        loadUserData();
    }, [reloadFlag]);

    const clear = () => {
        setLoading(true);

        clearSecureValue(SecureValue.TOKEN).then(() => {
            set(null);
            setLoading(false);
        });
    }

    // Function to trigger a manual reload
    const reload = () => {
        setReloadFlag((prev) => !prev); // Toggle the flag to trigger useEffect
    };

    return { data, loading, clear, reload };
}
