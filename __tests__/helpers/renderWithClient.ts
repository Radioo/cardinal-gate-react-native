import React from 'react';
import {render, RenderResult} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

export function createTestClient() {
    return new QueryClient({defaultOptions: {queries: {retry: false, gcTime: 0}}});
}

export async function renderWithClient(
    client: QueryClient,
    component: React.ReactElement,
): Promise<RenderResult> {
    return await render(
        React.createElement(QueryClientProvider, {client}, component)
    );
}
