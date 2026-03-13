import {TextInput, View} from "react-native";
import {useRef, useState} from "react";
import Logo from "@/assets/svg/Logo";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Text} from "@/components/ui/text";
import {router, Stack} from "expo-router";
import * as Device from 'expo-device';
import {LoginResponse} from "@/types/login-response";
import {fetchApi} from "@/services/api";
import {displayMessage} from "@/services/message";
import {MessageSeverity} from "@/enums/message-severity";
import {setAuthToken, clearSession} from "@/services/auth";

export default function LoginScreen() {
    const passwordRef = useRef<TextInput>(null);
    const totpRef = useRef<TextInput>(null);
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
            <View className="flex-1 justify-center items-center gap-5">
                <Logo width="50%" height="25%"/>
                <Input value={form.username}
                                 onChangeText={(text) => handleInputChange('username', text)}
                                 placeholder="Username or email"
                                 autoCapitalize="none"
                                 textContentType="username"
                                 returnKeyType="next"
                                 onSubmitEditing={() => passwordRef.current?.focus()}
                                 blurOnSubmit={false}
                                 className="border-primary w-1/2 min-w-[300px] max-w-[400px]"
                />
                <Input ref={passwordRef}
                                 value={form.password}
                                 onChangeText={(text) => handleInputChange('password', text)}
                                 placeholder="Password"
                                 autoCapitalize="none"
                                 textContentType="password"
                                 secureTextEntry={true}
                                 returnKeyType="next"
                                 onSubmitEditing={() => totpRef.current?.focus()}
                                 blurOnSubmit={false}
                                 className="border-primary w-1/2 min-w-[300px] max-w-[400px]"
                />
                <Input ref={totpRef}
                                 value={form.totpCode}
                                 onChangeText={(text) => handleInputChange('totpCode', text)}
                                 placeholder="TOTP code (if enabled)"
                                 autoCapitalize="none"
                                 keyboardType="number-pad"
                                 textContentType="oneTimeCode"
                                 returnKeyType="go"
                                 onSubmitEditing={login}
                                 className="border-primary w-1/2 min-w-[300px] max-w-[400px]"
                />
                <Button
                    className="h-10 px-2.5 w-1/2 min-w-[300px] max-w-[400px]"
                    disabled={loading}
                    onPress={login}
                >
                    {loading ? (
                        <View className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                        <Text className="font-bold">Login</Text>
                    )}
                </Button>
            </View>
        </>
    );
}
