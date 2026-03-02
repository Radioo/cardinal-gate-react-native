import {StyleSheet, View} from "react-native";
import {useState} from "react";
import Logo from "@/assets/svg/Logo";
import ThemedTextInput from "@/components/themed/ThemedTextInput";
import ThemedButton from "@/components/themed/ThemedButton";
import {router, Stack} from "expo-router";
import * as Device from 'expo-device';
import {LoginResponse} from "@/types/login-response";
import {fetchApi} from "@/services/api";
import {displayMessage} from "@/services/message";
import {MessageSeverity} from "@/enums/message-severity";
import {setAuthToken, clearSession} from "@/services/auth";

export default function LoginScreen() {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        username: '',
        password: '',
        totpCode: '',
    });

    const handleInputChange = (field: keyof typeof form, value: string) => {
        setForm(prevForm => ({
            ...prevForm,
            [field]: value
        }));
    };

    const login = async () => {
        setLoading(true);

        try {
            const response = await fetchApi<LoginResponse>('/api2/authorize', {
                method: 'POST',
                body: JSON.stringify({
                    username: form.username,
                    password: form.password,
                    totp_code: form.totpCode,
                    device_name: Device.deviceName || 'Unknown device',
                }),
            }, {skipAuth: true});

            displayMessage(MessageSeverity.SUCCESS, 'Login successful');
            await clearSession();
            await setAuthToken(response.token);
            router.replace('/main/Home');
        } catch (error) {
            displayMessage(MessageSeverity.ERROR, error instanceof Error ? error.message : 'Login failed');
        } finally {
            setLoading(false);
        }
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
                                 style={styles.input}
                />
                <ThemedTextInput value={form.password}
                                 onChangeText={(text) => handleInputChange('password', text)}
                                 placeholder="Password"
                                 autoCapitalize="none"
                                 textContentType="password"
                                 secureTextEntry={true}
                                 style={styles.input}
                />
                <ThemedTextInput value={form.totpCode}
                                 onChangeText={(text) => handleInputChange('totpCode', text)}
                                 placeholder="TOTP code (if enabled)"
                                 autoCapitalize="none"
                                 keyboardType="number-pad"
                                 textContentType="oneTimeCode"
                                 style={styles.input}
                />
                <ThemedButton loading={loading}
                              label="Login"
                              onPress={login}
                              style={styles.input}
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
    },
    input: {width: '50%', minWidth: 300},
});
