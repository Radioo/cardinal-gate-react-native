const mockGetSecureValue = jest.fn();

jest.mock('@/services/secure-storage', () => ({
    __esModule: true,
    getSecureValue: (...args: unknown[]) => mockGetSecureValue(...args),
}));

import React from 'react';
import {waitFor} from '@testing-library/react-native';
import useAuthToken from '@/hooks/queries/useAuthToken';
import {createTestClient, renderWithClient} from '@/__tests__/helpers/renderWithClient';
import {SecureValue} from '@/enums/secure-value';

function Capture({sink}: {sink: (value: ReturnType<typeof useAuthToken>) => void}) {
    const result = useAuthToken();
    sink(result);
    return React.createElement('Text', null, 'test');
}

describe('useAuthToken', () => {
    beforeEach(() => {
        mockGetSecureValue.mockReset();
    });

    it('queries the secure store for the auth token', async () => {
        mockGetSecureValue.mockResolvedValue('abc123');
        const client = createTestClient();
        const tree = await renderWithClient(client, React.createElement(Capture, {sink: () => {}}));
        expect(mockGetSecureValue).toHaveBeenCalledWith(SecureValue.TOKEN);
        client.cancelQueries();
        tree.unmount();
        client.clear();
    });

    it('does not retry on rejection', async () => {
        mockGetSecureValue.mockRejectedValue(new Error('offline'));
        const client = createTestClient();
        const captured: ReturnType<typeof useAuthToken>[] = [];
        const tree = await renderWithClient(
            client,
            React.createElement(Capture, {sink: (v) => captured.push(v)}),
        );
        await waitFor(() => expect(captured.at(-1)?.isError).toBe(true));
        expect(mockGetSecureValue).toHaveBeenCalledTimes(1);
        client.cancelQueries();
        tree.unmount();
        client.clear();
    });
});
