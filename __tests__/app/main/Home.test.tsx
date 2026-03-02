import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {TestRendererJSON} from '../../helpers/types';

jest.mock('@/hooks/queries/useSummary', () => ({
    __esModule: true,
    default: () => ({refetch: jest.fn()}),
}));

jest.mock('@/hooks/useUserRefresh', () => ({
    __esModule: true,
    default: () => ({refreshing: false, handleRefresh: jest.fn()}),
}));

jest.mock('@/components/shared/PlayCounts', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: () => createElement('View', {testID: 'play-counts'})};
});

import Home from '@/app/main/Home';

function findAll(node: TestRendererJSON | null, predicate: (n: TestRendererJSON) => boolean): TestRendererJSON[] {
    if (!node) return [];
    const results: TestRendererJSON[] = [];
    if (predicate(node)) results.push(node);
    if (node.children) {
        for (const child of node.children) {
            if (typeof child !== 'string') {
                results.push(...findAll(child, predicate));
            }
        }
    }
    return results;
}

describe('Home', () => {
    it('renders a ScrollView as root element', async () => {
        await render(<Home />);
        const tree = screen.toJSON() as TestRendererJSON;
        expect(tree).toBeTruthy();
        expect(tree.type).toBe('RCTScrollView');
    });

    it('contains PlayCounts component', async () => {
        await render(<Home />);
        const tree = screen.toJSON() as TestRendererJSON;
        const playCounts = findAll(tree, n => n.props?.testID === 'play-counts');
        expect(playCounts.length).toBe(1);
    });

    it('renders with a RefreshControl for pull-to-refresh', async () => {
        await render(<Home />);
        const tree = screen.toJSON() as TestRendererJSON;
        expect(tree.props.refreshControl).toBeDefined();
    });
});
