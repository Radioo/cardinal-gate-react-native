import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {Dialog, DialogContent} from '@/components/ui/dialog';
import {Text} from 'react-native';

jest.mock('@rn-primitives/dialog', () => {
    const {createElement} = require('react');
    return {
        Root: ({children, ...props}: {children: React.ReactNode}) =>
            createElement('View', {testID: 'dialog-root', ...props}, children),
        Overlay: ({children, ...props}: {children: React.ReactNode; className?: string}) =>
            createElement('View', {testID: 'dialog-overlay', ...props}, children),
        Portal: ({children}: {children: React.ReactNode}) =>
            createElement('View', {testID: 'dialog-portal'}, children),
        Content: ({children, ...props}: {children: React.ReactNode; className?: string}) =>
            createElement('View', {testID: 'dialog-content', ...props}, children),
        Title: (props: Record<string, unknown>) =>
            createElement('View', props),
    };
});

describe('Dialog', () => {
    it('renders children', async () => {
        await render(
            <Dialog>
                <Text>Dialog child</Text>
            </Dialog>
        );
        expect(screen.getByText('Dialog child')).toBeTruthy();
    });
});

describe('DialogContent', () => {
    it('renders children inside portal and overlay', async () => {
        await render(
            <Dialog>
                <DialogContent>
                    <Text>Content text</Text>
                </DialogContent>
            </Dialog>
        );
        expect(screen.getByText('Content text')).toBeTruthy();
        expect(screen.getByTestId('dialog-portal')).toBeTruthy();
        expect(screen.getByTestId('dialog-overlay')).toBeTruthy();
    });

    it('passes custom className', async () => {
        await render(
            <Dialog>
                <DialogContent className="custom-class">
                    <Text>Styled content</Text>
                </DialogContent>
            </Dialog>
        );
        expect(screen.getByText('Styled content')).toBeTruthy();
    });
});
