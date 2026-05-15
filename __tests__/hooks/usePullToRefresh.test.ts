const mockDisplayMessage = jest.fn();

jest.mock('@/lib/notifications', () => ({
    displayMessage: (...args: unknown[]) => mockDisplayMessage(...args),
}));

import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react-native';
import {act} from 'react';
import usePullToRefresh from '@/hooks/usePullToRefresh';

function TestComponent({refetch}: {refetch: () => Promise<void>}) {
    const {refreshing, handleRefresh} = usePullToRefresh(refetch);

    return React.createElement('View', {},
        React.createElement('Text', {testID: 'refreshing'}, String(refreshing)),
        React.createElement('Text', {testID: 'trigger', onPress: handleRefresh}),
    );
}

describe('usePullToRefresh', () => {
    beforeEach(() => {
        mockDisplayMessage.mockReset();
    });

    it('starts with refreshing as false', async () => {
        const refetch = jest.fn().mockResolvedValue(undefined);
        await render(React.createElement(TestComponent, {refetch}));
        const refreshingEl = screen.getByTestId('refreshing');
        expect(refreshingEl.props.children).toBe('false');
    });

    it('calls refetch when handleRefresh is invoked', async () => {
        const refetch = jest.fn().mockResolvedValue(undefined);
        await render(React.createElement(TestComponent, {refetch}));
        const triggerEl = screen.getByTestId('trigger');

        await act(async () => {
            fireEvent.press(triggerEl);
        });

        expect(refetch).toHaveBeenCalled();
    });

    it('surfaces refetch errors via displayMessage and stops refreshing', async () => {
        const refetch = jest.fn().mockRejectedValue(new Error('network down'));
        await render(React.createElement(TestComponent, {refetch}));
        const triggerEl = screen.getByTestId('trigger');
        const refreshingEl = screen.getByTestId('refreshing');

        await act(async () => {
            fireEvent.press(triggerEl);
        });

        await waitFor(() => expect(mockDisplayMessage).toHaveBeenCalled());
        expect(mockDisplayMessage.mock.calls[0][1]).toBe('network down');
        expect(refreshingEl.props.children).toBe('false');
    });
});
