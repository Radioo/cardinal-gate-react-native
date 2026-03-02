import React from 'react';
import renderer from 'react-test-renderer';

let mockUseIidxProfile: jest.Mock;

jest.mock('@/hooks/queries/useIidxProfile', () => ({
    __esModule: true,
    default: (...args: unknown[]) => mockUseIidxProfile(...args),
}));

jest.mock('@/hooks/useUserRefresh', () => ({
    __esModule: true,
    default: () => ({refreshing: false, handleRefresh: jest.fn()}),
}));

jest.mock('@/services/game', () => ({formatArcadeId: (id: number) => `${String(id).slice(0, 4)}-${String(id).slice(4, 8)}`}));

jest.mock('@expo/vector-icons/AntDesign', () => {
    const {createElement} = require('react');
    return (props: Record<string, unknown>) => createElement('View', {...props, testID: `icon-${props.name}`});
});
jest.mock('@expo/vector-icons/MaterialIcons', () => {
    const {createElement} = require('react');
    return (props: Record<string, unknown>) => createElement('View', {...props, testID: `icon-${props.name}`});
});
jest.mock('@expo/vector-icons', () => ({
    MaterialCommunityIcons: (props: Record<string, unknown>) => require('react').createElement('View', {...props, testID: `icon-${props.name}`}),
    Feather: (props: Record<string, unknown>) => require('react').createElement('View', {...props, testID: `icon-${props.name}`}),
}));

jest.mock('@/components/shared/FullScreenLoader', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: () => createElement('View', {testID: 'loader'})};
});

jest.mock('@/components/shared/ErrorScreen', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: ({error}: {error: Error}) => createElement('View', {testID: 'error'}, error.message)};
});

import Profile from '@/app/main/iidx/Profile';

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

describe('IIDX Profile', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('shows FullScreenLoader when pending', () => {
        mockUseIidxProfile = jest.fn(() => ({data: undefined, isPending: true, isError: false, error: null, refetch: jest.fn()}));
        const tree = renderer.create(<Profile />).toJSON() as renderer.ReactTestRendererJSON;
        const loaders = findAll(tree, n => n.props?.testID === 'loader');
        expect(loaders.length).toBe(1);
    });

    it('shows ErrorScreen when there is an error', () => {
        mockUseIidxProfile = jest.fn(() => ({data: undefined, isPending: false, isError: true, error: new Error('IIDX error'), refetch: jest.fn()}));
        const tree = renderer.create(<Profile />).toJSON() as renderer.ReactTestRendererJSON;
        const errors = findAll(tree, n => n.props?.testID === 'error');
        expect(errors.length).toBe(1);
        expect(errors[0].children).toContain('IIDX error');
    });

    it('displays DJ name and formatted arcade ID', () => {
        mockUseIidxProfile = jest.fn(() => ({
            data: {
                dj_name: 'TURNTABLE',
                iidx_id: 12345678,
                sp_play_count: 100,
                dp_play_count: 50,
                sp_class: '10th Dan',
                dp_class: '7th Dan',
                key_count: 10000,
                scratch_count: 5000,
            },
            isPending: false,
            isError: false,
            error: null,
            refetch: jest.fn(),
        }));
        const tree = renderer.create(<Profile />).toJSON() as renderer.ReactTestRendererJSON;
        const allText = collectText(tree);
        expect(allText).toContain('DJ TURNTABLE');
        expect(allText).toContain('1234-5678');
    });

    it('displays play counts for SP and DP', () => {
        mockUseIidxProfile = jest.fn(() => ({
            data: {
                dj_name: 'TEST',
                iidx_id: 12345678,
                sp_play_count: 1500,
                dp_play_count: 750,
                sp_class: '10th Dan',
                dp_class: '7th Dan',
                key_count: 10000,
                scratch_count: 5000,
            },
            isPending: false,
            isError: false,
            error: null,
            refetch: jest.fn(),
        }));
        const tree = renderer.create(<Profile />).toJSON() as renderer.ReactTestRendererJSON;
        const allText = collectText(tree);
        expect(allText.join(' ')).toContain('Play count');
        expect(allText.some(t => t.includes('SP'))).toBe(true);
        expect(allText.some(t => t.includes('DP'))).toBe(true);
    });

    it('displays class information', () => {
        mockUseIidxProfile = jest.fn(() => ({
            data: {
                dj_name: 'TEST',
                iidx_id: 12345678,
                sp_play_count: 100,
                dp_play_count: 50,
                sp_class: 'Kaiden',
                dp_class: '10th Dan',
                key_count: 10000,
                scratch_count: 5000,
            },
            isPending: false,
            isError: false,
            error: null,
            refetch: jest.fn(),
        }));
        const tree = renderer.create(<Profile />).toJSON() as renderer.ReactTestRendererJSON;
        const allText = collectText(tree);
        expect(allText.some(t => t.includes('Kaiden'))).toBe(true);
        expect(allText.some(t => t.includes('10th Dan'))).toBe(true);
    });
});
