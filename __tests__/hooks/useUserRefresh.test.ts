import React from 'react';
import renderer, {act} from 'react-test-renderer';
import useUserRefresh from '@/hooks/useUserRefresh';

function TestComponent({refetch}: {refetch: () => Promise<void>}) {
    const {refreshing, handleRefresh} = useUserRefresh(refetch);

    return React.createElement('View', {},
        React.createElement('Text', {testID: 'refreshing'}, String(refreshing)),
        React.createElement('Text', {testID: 'trigger', onPress: handleRefresh}),
    );
}

describe('useUserRefresh', () => {
    it('starts with refreshing as false', () => {
        const refetch = jest.fn().mockResolvedValue(undefined);
        const tree = renderer.create(React.createElement(TestComponent, {refetch}));
        const refreshingEl = tree.root.findByProps({testID: 'refreshing'});
        expect(refreshingEl.props.children).toBe('false');
    });

    it('calls refetch when handleRefresh is invoked', async () => {
        const refetch = jest.fn().mockResolvedValue(undefined);
        const tree = renderer.create(React.createElement(TestComponent, {refetch}));
        const triggerEl = tree.root.findByProps({testID: 'trigger'});

        await act(async () => {
            triggerEl.props.onPress();
        });

        expect(refetch).toHaveBeenCalled();
    });
});
