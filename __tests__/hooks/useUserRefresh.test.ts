import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import {act} from 'react';
import useUserRefresh from '@/hooks/useUserRefresh';

function TestComponent({refetch}: {refetch: () => Promise<void>}) {
    const {refreshing, handleRefresh} = useUserRefresh(refetch);

    return React.createElement('View', {},
        React.createElement('Text', {testID: 'refreshing'}, String(refreshing)),
        React.createElement('Text', {testID: 'trigger', onPress: handleRefresh}),
    );
}

describe('useUserRefresh', () => {
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
});
