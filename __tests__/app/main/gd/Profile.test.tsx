import React from 'react';
import renderer from 'react-test-renderer';

let mockUseGdProfile: jest.Mock;

jest.mock('@/hooks/queries/useGdProfile', () => ({
    __esModule: true,
    default: (...args: unknown[]) => mockUseGdProfile(...args),
}));

jest.mock('@/hooks/useUserRefresh', () => ({
    __esModule: true,
    default: () => ({refreshing: false, handleRefresh: jest.fn()}),
}));

jest.mock('@expo/vector-icons/AntDesign', () => {
    const {createElement} = require('react');
    return (props: Record<string, unknown>) => createElement('View', {...props, testID: `icon-${props.name}`});
});

jest.mock('@/components/shared/FullScreenLoader', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: () => createElement('View', {testID: 'loader'})};
});

jest.mock('@/components/shared/ErrorScreen', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: ({error}: {error: Error}) => createElement('View', {testID: 'error'}, error.message)};
});

import Profile from '@/app/main/gd/Profile';

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

function collectText(node: renderer.ReactTestRendererJSON | null): string[] {
    if (!node) return [];
    const texts: string[] = [];
    if (node.children) {
        for (const child of node.children) {
            if (typeof child === 'string') texts.push(child);
            else texts.push(...collectText(child));
        }
    }
    return texts;
}

describe('GD Profile', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('shows FullScreenLoader when pending', () => {
        mockUseGdProfile = jest.fn(() => ({data: undefined, isPending: true, isError: false, error: null, refetch: jest.fn()}));
        const tree = renderer.create(<Profile />).toJSON() as renderer.ReactTestRendererJSON;
        const loaders = findAll(tree, n => n.props?.testID === 'loader');
        expect(loaders.length).toBe(1);
    });

    it('shows ErrorScreen when there is an error', () => {
        mockUseGdProfile = jest.fn(() => ({data: undefined, isPending: false, isError: true, error: new Error('GD error'), refetch: jest.fn()}));
        const tree = renderer.create(<Profile />).toJSON() as renderer.ReactTestRendererJSON;
        const errors = findAll(tree, n => n.props?.testID === 'error');
        expect(errors.length).toBe(1);
        expect(errors[0].children).toContain('GD error');
    });

    it('displays the player name when data is loaded', () => {
        mockUseGdProfile = jest.fn(() => ({
            data: {name: 'GUITAR_HERO'},
            isPending: false,
            isError: false,
            error: null,
            refetch: jest.fn(),
        }));
        const tree = renderer.create(<Profile />).toJSON() as renderer.ReactTestRendererJSON;
        const allText = collectText(tree);
        expect(allText).toContain('GUITAR_HERO');
    });

    it('renders a user icon when data is loaded', () => {
        mockUseGdProfile = jest.fn(() => ({
            data: {name: 'TEST'},
            isPending: false,
            isError: false,
            error: null,
            refetch: jest.fn(),
        }));
        const tree = renderer.create(<Profile />).toJSON() as renderer.ReactTestRendererJSON;
        const icons = findAll(tree, n => n.props?.testID === 'icon-user');
        expect(icons.length).toBe(1);
    });
});
