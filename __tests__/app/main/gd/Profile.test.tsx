import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {TestRendererJSON} from '../../../helpers/types';

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
    return {__esModule: true, default: ({error}: {error: Error}) => createElement('View', {testID: 'error'}, createElement('Text', null, error.message))};
});

import Profile from '@/app/main/gd/Profile';

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

function collectText(node: TestRendererJSON | null): string[] {
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

    it('shows FullScreenLoader when pending', async () => {
        mockUseGdProfile = jest.fn(() => ({data: undefined, isPending: true, isError: false, error: null, refetch: jest.fn()}));
        await render(<Profile />);
        const tree = screen.toJSON() as TestRendererJSON;
        const loaders = findAll(tree, n => n.props?.testID === 'loader');
        expect(loaders.length).toBe(1);
    });

    it('shows ErrorScreen when there is an error', async () => {
        mockUseGdProfile = jest.fn(() => ({data: undefined, isPending: false, isError: true, error: new Error('GD error'), refetch: jest.fn()}));
        await render(<Profile />);
        const tree = screen.toJSON() as TestRendererJSON;
        const errors = findAll(tree, n => n.props?.testID === 'error');
        expect(errors.length).toBe(1);
        expect(JSON.stringify(errors[0])).toContain('GD error');
    });

    it('displays the player name when data is loaded', async () => {
        mockUseGdProfile = jest.fn(() => ({
            data: {name: 'GUITAR_HERO'},
            isPending: false,
            isError: false,
            error: null,
            refetch: jest.fn(),
        }));
        await render(<Profile />);
        const tree = screen.toJSON() as TestRendererJSON;
        const allText = collectText(tree);
        expect(allText).toContain('GUITAR_HERO');
    });

    it('renders a user icon when data is loaded', async () => {
        mockUseGdProfile = jest.fn(() => ({
            data: {name: 'TEST'},
            isPending: false,
            isError: false,
            error: null,
            refetch: jest.fn(),
        }));
        await render(<Profile />);
        const tree = screen.toJSON() as TestRendererJSON;
        const icons = findAll(tree, n => n.props?.testID === 'icon-user');
        expect(icons.length).toBe(1);
    });
});
