jest.mock('@/services/api', () => ({
    __esModule: true,
    fetchApi: jest.fn(),
}));

import React from 'react';
import useGdSkill from '@/hooks/queries/useGdSkill';
import {createTestClient, renderWithClient} from '@/__tests__/helpers/renderWithClient';

function TestComponent({version, onResult}: {version: number | undefined; onResult: (data: {fetchStatus: string; isPending: boolean}) => void}) {
    const result = useGdSkill(version);
    React.useEffect(() => {
        onResult({fetchStatus: result.fetchStatus, isPending: result.isPending});
    }, [result, onResult]);
    return React.createElement('Text', null, 'test');
}

describe('useGdSkill', () => {
    it('is disabled when version is undefined', async () => {
        const client = createTestClient();
        const results: Array<{fetchStatus: string; isPending: boolean}> = [];
        const tree = await renderWithClient(
            client,
            React.createElement(TestComponent, {
                version: undefined,
                onResult: (data) => { results.push(data); },
            })
        );
        expect(results.some(r => r.fetchStatus === 'idle')).toBe(true);
        tree.unmount();
        client.clear();
    });

    it('is enabled when version is provided', async () => {
        const client = createTestClient();
        const results: Array<{fetchStatus: string; isPending: boolean}> = [];
        const tree = await renderWithClient(
            client,
            React.createElement(TestComponent, {
                version: 10,
                onResult: (data) => { results.push(data); },
            })
        );
        expect(results.some(r => r.fetchStatus === 'fetching')).toBe(true);
        tree.unmount();
        client.clear();
    });

    it('uses correct query key with version', async () => {
        const client = createTestClient();
        const tree = await renderWithClient(
            client,
            React.createElement(TestComponent, {version: 10, onResult: () => {}})
        );
        const queryCache = client.getQueryCache();
        const queries = queryCache.getAll();
        expect(queries.length).toBeGreaterThan(0);
        expect(queries[0].queryKey).toEqual(['gdSkill', 10]);
        tree.unmount();
        client.clear();
    });
});
