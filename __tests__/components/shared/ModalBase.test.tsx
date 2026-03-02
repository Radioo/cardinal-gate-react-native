import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {Text} from 'react-native';
import ModalBase from '@/components/shared/ModalBase';

jest.mock('expo-blur', () => ({
    BlurView: 'BlurView',
}));

jest.mock('react-native-safe-area-context', () => ({
    SafeAreaProvider: ({children}: {children: React.ReactNode}) => children,
}));

describe('ModalBase', () => {
    it('renders without crashing when visible', async () => {
        await render(
            <ModalBase visible={true}>
                <Text>Content</Text>
            </ModalBase>
        );
        expect(screen.toJSON()).toBeTruthy();
    });

    it('renders without crashing when not visible', async () => {
        await render(
            <ModalBase visible={false}>
                <Text>Content</Text>
            </ModalBase>
        );
        expect(screen.toJSON()).toBeTruthy();
    });
});
