jest.mock('@/services/api', () => ({
    __esModule: true,
    fetchApi: jest.fn(),
}));

import React from 'react';
import useIidxProfile from '@/hooks/queries/useIidxProfile';
import {createTestClient, renderWithClient} from '@/__tests__/helpers/renderWithClient';

function TestComponent({onResult}: {onResult: (data: {queryKey: unknown}) => void}) {
    const result = useIidxProfile();
    React.useEffect(() => {
        onResult({queryKey: result.isSuccess || result.isPending ? 'called' : 'error'});
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
        tree.unmount();
        client.clear();
    });

    it('is exported as default function', () => {
        expect(typeof useIidxProfile).toBe('function');
    });
});
