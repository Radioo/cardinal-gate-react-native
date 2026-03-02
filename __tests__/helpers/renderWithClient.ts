import React from 'react';
import renderer, {act} from 'react-test-renderer';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

export function createTestClient() {
    return new QueryClient({defaultOptions: {queries: {retry: false}}});
}

export async function renderWithClient(
    client: QueryClient,
    component: React.ReactElement,
): Promise<renderer.ReactTestRenderer> {
    let tree: renderer.ReactTestRenderer | null = null;
    await act(async () => {
        tree = renderer.create(
            React.createElement(QueryClientProvider, {client}, component)
        );
    });
    if (!tree) throw new Error('Failed to render component');
    return tree;
}
