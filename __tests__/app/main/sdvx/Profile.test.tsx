import React from 'react';
import renderer from 'react-test-renderer';

let mockUseSdvxProfile: jest.Mock;

jest.mock('@/hooks/queries/useSdvxProfile', () => ({
    __esModule: true,
    default: (...args: unknown[]) => mockUseSdvxProfile(...args),
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
jest.mock('@expo/vector-icons', () => ({
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

import Profile from '@/app/main/sdvx/Profile';

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

describe('SDVX Profile', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('shows FullScreenLoader when pending', () => {
        mockUseSdvxProfile = jest.fn(() => ({data: undefined, isPending: true, isError: false, error: null, refetch: jest.fn()}));
        const tree = renderer.create(<Profile />).toJSON() as renderer.ReactTestRendererJSON;
        const loaders = findAll(tree, n => n.props?.testID === 'loader');
        expect(loaders.length).toBe(1);
    });

    it('shows ErrorScreen when there is an error', () => {
        mockUseSdvxProfile = jest.fn(() => ({data: undefined, isPending: false, isError: true, error: new Error('SDVX error'), refetch: jest.fn()}));
        const tree = renderer.create(<Profile />).toJSON() as renderer.ReactTestRendererJSON;
        const errors = findAll(tree, n => n.props?.testID === 'error');
        expect(errors.length).toBe(1);
        expect(errors[0].children).toContain('SDVX error');
    });

    it('displays player name and formatted arcade ID', () => {
        mockUseSdvxProfile = jest.fn(() => ({
            data: {
                name: 'VOLTEXER',
                id: 87654321,
                skill_level: 'IMPERIAL IV',
                volforce: {formattedValue: '20.000', name: 'IMPERIAL IV'},
            },
            isPending: false,
            isError: false,
            error: null,
            refetch: jest.fn(),
        }));
        const tree = renderer.create(<Profile />).toJSON() as renderer.ReactTestRendererJSON;
        const allText = collectText(tree);
        expect(allText).toContain('VOLTEXER');
        expect(allText).toContain('8765-4321');
    });

    it('displays skill level', () => {
        mockUseSdvxProfile = jest.fn(() => ({
            data: {
                name: 'TEST',
                id: 12345678,
                skill_level: 'IMPERIAL IV',
                volforce: {formattedValue: '20.000', name: 'IMPERIAL IV'},
            },
            isPending: false,
            isError: false,
            error: null,
            refetch: jest.fn(),
        }));
        const tree = renderer.create(<Profile />).toJSON() as renderer.ReactTestRendererJSON;
        const allText = collectText(tree);
        expect(allText).toContain('Skill Level');
        expect(allText).toContain('IMPERIAL IV');
    });

    it('displays VOLFORCE when available', () => {
        mockUseSdvxProfile = jest.fn(() => ({
            data: {
                name: 'TEST',
                id: 12345678,
                skill_level: 'IMPERIAL IV',
                volforce: {formattedValue: '20.000', name: 'IMPERIAL IV'},
            },
            isPending: false,
            isError: false,
            error: null,
            refetch: jest.fn(),
        }));
        const tree = renderer.create(<Profile />).toJSON() as renderer.ReactTestRendererJSON;
        const allText = collectText(tree);
        expect(allText).toContain('VOLFORCE');
        expect(allText).toContain('20.000 IMPERIAL IV');
    });

    it('does not display VOLFORCE when null', () => {
        mockUseSdvxProfile = jest.fn(() => ({
            data: {
                name: 'TEST',
                id: 12345678,
                skill_level: 'NOVICE',
                volforce: null,
            },
            isPending: false,
            isError: false,
            error: null,
            refetch: jest.fn(),
        }));
        const tree = renderer.create(<Profile />).toJSON() as renderer.ReactTestRendererJSON;
        const allText = collectText(tree);
        expect(allText).not.toContain('VOLFORCE');
        const icons = findAll(tree, n => n.props?.testID === 'icon-hexagon');
        expect(icons.length).toBe(0);
    });
});
