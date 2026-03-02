import React from 'react';
import renderer from 'react-test-renderer';

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
    return {__esModule: true, default: () => createElement('View', {testID: 'play-counts'}, 'PlayCounts')};
});

import Home from '@/app/main/Home';

function findAll(node: renderer.ReactTestRendererJSON | null, predicate: (n: renderer.ReactTestRendererJSON) => boolean): renderer.ReactTestRendererJSON[] {
    if (!node) return [];
    const results: renderer.ReactTestRendererJSON[] = [];
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
    it('renders a ScrollView as root element', () => {
        const tree = renderer.create(<Home />).toJSON() as renderer.ReactTestRendererJSON;
        expect(tree).toBeTruthy();
        expect(tree.type).toBe('RCTScrollView');
    });

    it('contains PlayCounts component', () => {
        const tree = renderer.create(<Home />).toJSON() as renderer.ReactTestRendererJSON;
        const playCounts = findAll(tree, n => n.props?.testID === 'play-counts');
        expect(playCounts.length).toBe(1);
    });

    it('renders with a RefreshControl for pull-to-refresh', () => {
        const component = renderer.create(<Home />);
        const instance = component.root;
        const refreshControls = instance.findAllByProps({refreshing: false});
        expect(refreshControls.length).toBeGreaterThan(0);
    });
});
