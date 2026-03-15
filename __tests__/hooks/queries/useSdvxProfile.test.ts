jest.mock('@/services/api', () => ({
    __esModule: true,
    fetchApi: jest.fn().mockResolvedValue({}),
}));

import React from 'react';
import useSdvxProfile from '@/hooks/queries/useSdvxProfile';
import {createTestClient, renderWithClient} from '@/__tests__/helpers/renderWithClient';
import {fetchApi} from '@/services/api';

function TestComponent({onResult}: {onResult: () => void}) {
    const result = useSdvxProfile();
    React.useEffect(() => {
        onResult();
    }, [result, onResult]);
    return React.createElement('Text', null, 'test');
}

describe('useSdvxProfile', () => {
    it('calls useQuery with correct configuration', async () => {
        const client = createTestClient();
        const tree = await renderWithClient(
            client,
            React.createElement(TestComponent, {onResult: () => {}})
        );
        expect(fetchApi).toHaveBeenCalledWith('/api2/sdvx/profile');
        client.cancelQueries();
        tree.unmount();
        client.clear();
    });

    it('is exported as default function', () => {
        expect(typeof useSdvxProfile).toBe('function');
    });
});
