import { StyleSheet } from 'react-native';
import {Redirect} from "expo-router";

export default function HomeScreen() {
    return (
        <Redirect href={'/login'} />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
