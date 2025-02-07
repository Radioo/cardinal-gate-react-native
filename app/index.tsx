import {Link, Redirect, Stack} from 'expo-router';

export default function Root() {
    return (
        <Redirect href="/login" />
    );
}
