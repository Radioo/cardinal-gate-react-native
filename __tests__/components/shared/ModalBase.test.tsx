import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {Text} from 'react-native';
import ModalBase from '@/components/shared/ModalBase';

jest.mock('react-native-safe-area-context', () => ({
    SafeAreaProvider: ({children}: {children: React.ReactNode}) => children,
}));

jest.mock('@rn-primitives/dialog', () => {
    const {createElement} = require('react');
    return {
        Root: ({children, ...props}: Record<string, unknown>) =>
            createElement('View', {testID: 'dialog-root', ...props}, children),
        Overlay: ({children}: Record<string, unknown>) =>
            createElement('View', {testID: 'dialog-overlay'}, children),
        Portal: ({children}: Record<string, unknown>) =>
            createElement('View', {testID: 'dialog-portal'}, children),
        Content: ({children, ...props}: Record<string, unknown>) =>
            createElement('View', {testID: 'dialog-content', ...props}, children),
        Title: (props: Record<string, unknown>) =>
            createElement('View', props),
    };
});

describe('ModalBase', () => {
    it('renders children when visible', async () => {
        await render(
            <ModalBase visible={true}>
                <Text>Modal Content</Text>
            </ModalBase>
        );
        expect(screen.getByText('Modal Content')).toBeTruthy();
    });

    it('renders dialog structure', async () => {
        await render(
            <ModalBase visible={true}>
                <Text>Content</Text>
            </ModalBase>
        );
        expect(screen.getByTestId('dialog-root')).toBeTruthy();
        expect(screen.getByTestId('dialog-content')).toBeTruthy();
    });

    it('passes visible prop as open to Dialog root', async () => {
        await render(
            <ModalBase visible={false}>
                <Text>Content</Text>
            </ModalBase>
        );
        const root = screen.getByTestId('dialog-root');
        expect(root.props.open).toBe(false);
    });
});
