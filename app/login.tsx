import {Easing, StyleSheet, View} from "react-native";
import {useState} from "react";
import Logo from "@/assets/svg/Logo";
import {ThemedTextInput} from "@/components/ThemedTextInput";
import {ThemedButton} from "@/components/ThemedButton";
import {Notifier} from "react-native-notifier";

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

    const login = () => {
        setLoading(true);

        Notifier.showNotification({
            title: 'John Doe',
            description: 'Hello! Can you help me with notifications?',
            duration: 2000,
            showAnimationDuration: 800,
            showEasing: Easing.elastic(1),
            onHidden: () => console.log('Hidden'),
            onPress: () => console.log('Press'),
            hideOnPress: false,
        });

        fetch(`${process.env.EXPO_PUBLIC_API_URL}/authorize`, {
            method: 'POST',
        })
            .then(res => res.json())
            .then(data => {
                console.log('data', data);
            })
            .catch(err => {
                console.log('err', err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <View style={styles.container}>
            <Logo width="50%" height="25%"/>
            <ThemedTextInput value={form.username}
                             onChangeText={(text) => handleInputChange('username', text)}
                             placeholder="Username"
                             style={{width: '50%', minWidth: 300}}
            />
            <ThemedTextInput value={form.password}
                             onChangeText={(text) => handleInputChange('password', text)}
                             placeholder="Password"
                             style={{width: '50%', minWidth: 300}}
            />
            <ThemedButton loading={loading}
                          label="Login"
                          onPress={login}
                          style={{width: '50%', minWidth: 300}}
            />
        </View>
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
