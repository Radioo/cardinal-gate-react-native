jest.mock('@/services/api', () => ({
    __esModule: true,
    fetchApi: jest.fn().mockResolvedValue({}),
}));

import React from 'react';
import useSdvxProfile from '@/hooks/queries/useSdvxProfile';
import {createTestClient, renderWithClient} from '@/__tests__/helpers/renderWithClient';

function TestComponent({onResult}: {onResult: (data: {queryKey: unknown}) => void}) {
    const result = useSdvxProfile();
    React.useEffect(() => {
        onResult({queryKey: result.isSuccess || result.isPending ? 'called' : 'error'});
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
        const queryCache = client.getQueryCache();
        const queries = queryCache.getAll();
        expect(queries.length).toBeGreaterThan(0);
        expect(queries[0].queryKey).toEqual(['sdvxProfile']);
        client.cancelQueries();
        tree.unmount();
        client.clear();
    });

    it('is exported as default function', () => {
        expect(typeof useSdvxProfile).toBe('function');
    });
});
