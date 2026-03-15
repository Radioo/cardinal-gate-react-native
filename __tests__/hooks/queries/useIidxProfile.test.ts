jest.mock('@/services/api', () => ({
    __esModule: true,
    fetchApi: jest.fn().mockResolvedValue({}),
}));

import React from 'react';
import useIidxProfile from '@/hooks/queries/useIidxProfile';
import {createTestClient, renderWithClient} from '@/__tests__/helpers/renderWithClient';
import {fetchApi} from '@/services/api';

function TestComponent({onResult}: {onResult: () => void}) {
    const result = useIidxProfile();
    React.useEffect(() => {
        onResult();
    }, [result, onResult]);
    return React.createElement('Text', null, 'test');
}

describe('useIidxProfile', () => {
    it('calls useQuery with correct configuration', async () => {
        const client = createTestClient();
        const tree = await renderWithClient(
            client,
            React.createElement(TestComponent, {onResult: () => {}})
        );
        expect(fetchApi).toHaveBeenCalledWith('/api2/iidx/profile');
        client.cancelQueries();
        tree.unmount();
        client.clear();
    });

    it('is exported as default function', () => {
        expect(typeof useIidxProfile).toBe('function');
    });
});
