jest.mock('@/services/secure-storage', () => ({
    getSecureValue: jest.fn(),
}));

import React from 'react';
import {render, cleanup, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import useAuthHeaders from '@/hooks/useAuthHeaders';
import {getSecureValue} from '@/services/secure-storage';

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

async function renderTest(onResult: (d: Record<string, string>) => void) {
    const client = new QueryClient({defaultOptions: {queries: {retry: false, gcTime: 0}}});
    const utils = await render(
        React.createElement(QueryClientProvider, {client},
            React.createElement(TestComponent, {onResult})
        )
    );
    await waitFor(() => expect(utils.getByText('done')).toBeTruthy());
    return {client};
}

describe('useAuthHeaders', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('returns headers with CG-Token when token exists', async () => {
        mockGetSecureValue.mockResolvedValue('test-token');
        let headers: Record<string, string> = {};
        const {client} = await renderTest((d) => { headers = d; });
        expect(headers).toEqual({'CG-Token': 'test-token'});
        cleanup();
        client.clear();
    });

    it('returns empty headers when token is null', async () => {
        mockGetSecureValue.mockResolvedValue(null);
        let headers: Record<string, string> = {};
        const {client} = await renderTest((d) => { headers = d; });
        expect(headers).toEqual({});
        cleanup();
        client.clear();
    });
});
