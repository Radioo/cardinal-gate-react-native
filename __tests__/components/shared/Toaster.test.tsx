import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {useToastStore} from '@/store/toast';
import {MessageSeverity} from '@/enums/message-severity';

jest.mock('react-native-safe-area-context', () => ({
    useSafeAreaInsets: () => ({top: 0, bottom: 0, left: 0, right: 0}),
}));

jest.mock('@rn-primitives/portal', () => {
    const {createElement} = require('react');
    return {Portal: ({children}: {children: React.ReactNode}) => createElement('View', {testID: 'portal'}, children)};
});

jest.mock('lucide-react-native', () => {
    const {createElement} = require('react');
    const Icon = (props: Record<string, unknown>) => createElement('View', props);
    return {CircleCheck: Icon, CircleX: Icon, X: Icon};
});

import {Toaster} from '@/components/shared/Toaster';

describe('Toaster', () => {
    beforeEach(() => {
        useToastStore.setState({toasts: []});
    });

    it('renders nothing when no toasts', async () => {
        const {toJSON} = await render(<Toaster />);
        expect(toJSON()).toBeNull();
    });

    it('renders toast items when toasts exist', async () => {
        useToastStore.setState({
            toasts: [
                {id: '1', severity: MessageSeverity.SUCCESS, title: 'Done', description: 'It worked'},
            ],
        });
        await render(<Toaster />);
        expect(screen.getByText('Done')).toBeTruthy();
        expect(screen.getByText('It worked')).toBeTruthy();
    });

    it('renders multiple toasts', async () => {
        useToastStore.setState({
            toasts: [
                {id: '1', severity: MessageSeverity.SUCCESS, title: 'First', description: 'a'},
                {id: '2', severity: MessageSeverity.ERROR, title: 'Second', description: 'b'},
            ],
        });
        await render(<Toaster />);
        expect(screen.getByText('First')).toBeTruthy();
        expect(screen.getByText('Second')).toBeTruthy();
    });
});
