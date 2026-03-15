jest.mock('@/services/api', () => ({
    __esModule: true,
    fetchApi: jest.fn().mockResolvedValue({}),
}));

import React from 'react';
import useSdvxPlays from '@/hooks/queries/useSdvxPlays';
import {createTestClient, renderWithClient} from '@/__tests__/helpers/renderWithClient';
import {fetchApi} from '@/services/api';

function TestComponent({page, onResult}: {page: number; onResult: () => void}) {
    const result = useSdvxPlays(page);
    React.useEffect(() => {
        onResult();
    }, [result, onResult]);
    return React.createElement('Text', null, 'test');
}

describe('useSdvxPlays', () => {
    it('calls useQuery with correct configuration', async () => {
        const client = createTestClient();
        const tree = await renderWithClient(
            client,
            React.createElement(TestComponent, {page: 1, onResult: () => {}})
        );
        expect(fetchApi).toHaveBeenCalledWith('/api2/sdvx/plays?page=1');
        client.cancelQueries();
        tree.unmount();
        client.clear();
    });

    it('is exported as default function', () => {
        expect(typeof useSdvxPlays).toBe('function');
    });
});
