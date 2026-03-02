jest.mock('@/store/secure', () => ({
    getSecureValue: jest.fn(),
}));

import React from 'react';
import renderer, {act} from 'react-test-renderer';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import useAuthHeaders from '@/hooks/useAuthHeaders';
import {getSecureValue} from '@/store/secure';

const mockGetSecureValue = getSecureValue as jest.MockedFunction<typeof getSecureValue>;

function TestComponent({onResult}: {onResult: (data: Record<string, string>) => void}) {
    const {data, isSuccess} = useAuthHeaders();
    React.useEffect(() => {
        if (isSuccess && data) {
            onResult(data);
        }
    }, [isSuccess, data, onResult]);
    return React.createElement('Text', null, isSuccess ? 'done' : 'loading');
}

function flushPromises() {
    return new Promise(resolve => setTimeout(resolve, 0));
}

async function renderTest(onResult: (d: Record<string, string>) => void) {
    const client = new QueryClient({defaultOptions: {queries: {retry: false}}});
    let tree: renderer.ReactTestRenderer = undefined as unknown as renderer.ReactTestRenderer;
    await act(async () => {
        tree = renderer.create(
            React.createElement(QueryClientProvider, {client},
                React.createElement(TestComponent, {onResult})
            )
        );
    });
    await act(async () => {
        await flushPromises();
    });
    return {tree, client};
}

describe('useAuthHeaders', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('returns headers with CG-Token when token exists', async () => {
        mockGetSecureValue.mockResolvedValue('test-token');
        let result: Record<string, string> = {};
        const {tree, client} = await renderTest((d) => { result = d; });
        expect(result).toEqual({'CG-Token': 'test-token'});
        tree.unmount();
        client.clear();
    });

    it('returns empty headers when token is null', async () => {
        mockGetSecureValue.mockResolvedValue(null);
        let result: Record<string, string> = {};
        const {tree, client} = await renderTest((d) => { result = d; });
        expect(result).toEqual({});
        tree.unmount();
        client.clear();
    });
});
