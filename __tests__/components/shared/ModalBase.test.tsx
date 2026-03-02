import React from 'react';
import renderer from 'react-test-renderer';
import {Text} from 'react-native';
import ModalBase from '@/components/shared/ModalBase';

jest.mock('expo-blur', () => ({
    BlurView: 'BlurView',
}));

jest.mock('react-native-safe-area-context', () => ({
    SafeAreaProvider: ({children}: {children: React.ReactNode}) => children,
}));

describe('ModalBase', () => {
    it('renders without crashing when visible', () => {
        const tree = renderer.create(
            <ModalBase visible={true}>
                <Text>Content</Text>
            </ModalBase>
        ).toJSON();
        expect(tree).toBeTruthy();
    });

    it('renders without crashing when not visible', () => {
        const tree = renderer.create(
            <ModalBase visible={false}>
                <Text>Content</Text>
            </ModalBase>
        ).toJSON();
        expect(tree).toBeTruthy();
    });
});
