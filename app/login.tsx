import {StyleSheet, View} from "react-native";
import {useState} from "react";
import Logo from "@/assets/svg/Logo";
import {ThemedTextInput} from "@/components/ThemedTextInput";
import {ThemedButton} from "@/components/ThemedButton";
import {Notifier, NotifierComponents} from "react-native-notifier";
import {router, Stack} from "expo-router";
import * as Device from 'expo-device';
import {saveSecureValue} from "@/store/secure";
import {SecureValue} from "@/enums/secure-value";
import {LoginResponse} from "@/types/login-response";
import FullScreenLoader from "@/components/FullScreenLoader";

export default function LoginScreen() {
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

        fetch(`${process.env.EXPO_PUBLIC_API_URL}/authorize`, {
            method: 'POST',
            body: JSON.stringify({
                ...form,
                device_name: Device.deviceName,
            }),
        })
            .catch(error => {
                Notifier.showNotification({
                    title: 'Error',
                    description: 'Request error',
                    Component: NotifierComponents.Alert,
                    componentProps: {
                        alertType: 'error',
                    },
                });

                return Promise.reject(error);
            })
            .then(async res => {
                console.log('res', res);
                if (!res.ok) {
                    let error = 'Unknown error';

                    if (res.headers.get('content-type') === 'application/json') {
                        const json = await res.json();
                        error = json.error;
                    }

                    Notifier.showNotification({
                        title: 'Error',
                        description: error,
                        Component: NotifierComponents.Alert,
                        componentProps: {
                            alertType: 'error',
                        },
                    });

                    return Promise.reject(error);
                }

                return res.json();
            })
            .then(async (data: LoginResponse) => {
                console.log('data', data);

                Notifier.showNotification({
                    title: 'Success',
                    description: 'Login successful',
                    Component: NotifierComponents.Alert,
                    componentProps: {
                        alertType: 'success',
                    }
                });

                await saveSecureValue(SecureValue.TOKEN, data.token);

                router.replace('/main/home');
            })
            .catch(error => {
                console.error('error', error);
            })
            .finally(() => {
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
                                 placeholder="Username"
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
