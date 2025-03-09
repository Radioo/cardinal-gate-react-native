import {StyleSheet, View} from "react-native";
import {useState} from "react";
import Logo from "@/assets/svg/Logo";
import {ThemedTextInput} from "@/components/ThemedTextInput";
import {ThemedButton} from "@/components/ThemedButton";
import {router, Stack} from "expo-router";
import * as Device from 'expo-device';
import {saveSecureValue} from "@/store/secure";
import {SecureValue} from "@/enums/secure-value";
import {LoginResponse} from "@/types/login-response";
import fetchApi from "@/services/api";
import {displayMessage} from "@/services/message";
import {MessageSeverity} from "@/enums/message-severity";
import {useQueryClient} from "@tanstack/react-query";

export default function LoginScreen() {
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    const handleInputChange = (field: string, value: string) => {
        setForm(prevForm => ({
            ...prevForm,
            [field]: value
        }));
    };

    const login = async () => {
        console.log('login', process.env.EXPO_PUBLIC_API_URL);
        setLoading(true);

        fetchApi<LoginResponse>('/api2/authorize', {
            method: 'POST',
            body: JSON.stringify({
                ...form,
                device_name: Device.deviceName || 'Unknown device',
            }),
        }).then(async response => {
            displayMessage(MessageSeverity.SUCCESS, 'Login successful');

            await saveSecureValue(SecureValue.TOKEN, response.token);
            queryClient.removeQueries();

            router.replace('/main/Home');
        }).finally(() => {
            setLoading(false);
        });
    };

    return (
        <>
            <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} />
            <View style={styles.container}>
                <Logo width="50%" height="25%"/>
                <ThemedTextInput value={form.username}
                                 onChangeText={(text) => handleInputChange('username', text)}
                                 placeholder="Username or email"
                                 autoCapitalize="none"
                                 textContentType="username"
                                 style={{width: '50%', minWidth: 300}}
                />
                <ThemedTextInput value={form.password}
                                 onChangeText={(text) => handleInputChange('password', text)}
                                 placeholder="Password"
                                 autoCapitalize="none"
                                 textContentType="password"
                                 secureTextEntry={true}
                                 style={{width: '50%', minWidth: 300}}
                />
                <ThemedButton loading={loading}
                              label="Login"
                              onPress={login}
                              style={{width: '50%', minWidth: 300}}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    }
});
