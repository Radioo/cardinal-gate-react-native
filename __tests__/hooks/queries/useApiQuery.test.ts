jest.mock('@/services/api', () => ({__esModule: true, fetchApi: jest.fn().mockResolvedValue({})}));

import React from 'react';
import useApiQuery from '@/hooks/queries/useApiQuery';
import {createTestClient, renderWithClient} from '@/__tests__/helpers/renderWithClient';

function TestComponent({onResult}: {onResult: (data: {isPending: boolean; isSuccess: boolean}) => void}) {
    const result = useApiQuery<Record<string, unknown>>(['testKey'], '/test-endpoint');
    React.useEffect(() => {
        onResult({isPending: result.isPending, isSuccess: result.isSuccess});
    }, [result, onResult]);
    return React.createElement('Text', null, 'test');
}

describe('useApiQuery', () => {
    it('is exported as default function', () => {
        expect(typeof useApiQuery).toBe('function');
    });

    it('starts in pending state when rendered', async () => {
        const client = createTestClient();
        const results: Array<{isPending: boolean; isSuccess: boolean}> = [];
        const tree = await renderWithClient(
            client,
            React.createElement(TestComponent, {
                onResult: (data) => results.push(data),
            })
        );
        expect(results.length).toBeGreaterThan(0);
        expect(results[0].isPending).toBe(true);
        client.cancelQueries();
        tree.unmount();
        client.clear();
    });

    it('uses staleTime Infinity by default', async () => {
        const client = createTestClient();
        const tree = await renderWithClient(
            client,
            React.createElement(TestComponent, {onResult: () => {}})
        );
        const queryCache = client.getQueryCache();
        const queries = queryCache.getAll();
        expect(queries.length).toBeGreaterThan(0);
        expect(queries[0].options.staleTime).toBe(Infinity);
        client.cancelQueries();
        tree.unmount();
        client.clear();
    });
});
