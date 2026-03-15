import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {TestRendererJSON} from '../../../helpers/types';
import {collectText, findAll} from '../../../helpers/tree-utils';

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

jest.mock('lucide-react-native', () => {
    const {createElement} = require('react');
    const makeIcon = (name: string) => (props: Record<string, unknown>) => createElement('View', {...props, testID: `icon-${name}`});
    return {
        User: makeIcon('user'),
        Star: makeIcon('star'),
        Hexagon: makeIcon('hexagon'),
    };
});

jest.mock('@/components/shared/FullScreenLoader', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: () => createElement('View', {testID: 'loader'})};
});

jest.mock('@/components/shared/ErrorScreen', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: ({error}: {error: Error}) => createElement('View', {testID: 'error'}, createElement('Text', null, error.message))};
});

import Profile from '@/app/main/sdvx/Profile';

describe('SDVX Profile', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('shows FullScreenLoader when pending', async () => {
        mockUseSdvxProfile = jest.fn(() => ({data: undefined, isPending: true, isError: false, error: null, refetch: jest.fn()}));
        await render(<Profile />);
        const tree = screen.toJSON() as TestRendererJSON;
        const loaders = findAll(tree, n => n.props?.testID === 'loader');
        expect(loaders.length).toBe(1);
    });

    it('shows ErrorScreen when there is an error', async () => {
        mockUseSdvxProfile = jest.fn(() => ({data: undefined, isPending: false, isError: true, error: new Error('SDVX error'), refetch: jest.fn()}));
        await render(<Profile />);
        const tree = screen.toJSON() as TestRendererJSON;
        const errors = findAll(tree, n => n.props?.testID === 'error');
        expect(errors.length).toBe(1);
        expect(JSON.stringify(errors[0])).toContain('SDVX error');
    });

    it('displays player name and formatted arcade ID', async () => {
        mockUseSdvxProfile = jest.fn(() => ({
            data: {
                name: 'VOLTEXER',
                id: 87654321,
                skill_level: 'IMPERIAL IV',
                volforce: {formatted_value: '20.000', name: 'IMPERIAL IV'},
            },
            isPending: false,
            isError: false,
            error: null,
            refetch: jest.fn(),
        }));
        await render(<Profile />);
        const tree = screen.toJSON() as TestRendererJSON;
        const allText = collectText(tree);
        expect(allText).toContain('VOLTEXER');
        expect(allText).toContain('8765-4321');
    });

    it('displays skill level', async () => {
        mockUseSdvxProfile = jest.fn(() => ({
            data: {
                name: 'TEST',
                id: 12345678,
                skill_level: 'IMPERIAL IV',
                volforce: {formatted_value: '20.000', name: 'IMPERIAL IV'},
            },
            isPending: false,
            isError: false,
            error: null,
            refetch: jest.fn(),
        }));
        await render(<Profile />);
        const tree = screen.toJSON() as TestRendererJSON;
        const allText = collectText(tree);
        expect(allText).toContain('Skill Level');
        expect(allText).toContain('IMPERIAL IV');
    });

    it('displays VOLFORCE when available', async () => {
        mockUseSdvxProfile = jest.fn(() => ({
            data: {
                name: 'TEST',
                id: 12345678,
                skill_level: 'IMPERIAL IV',
                volforce: {formatted_value: '20.000', name: 'IMPERIAL IV'},
            },
            isPending: false,
            isError: false,
            error: null,
            refetch: jest.fn(),
        }));
        await render(<Profile />);
        const tree = screen.toJSON() as TestRendererJSON;
        const allText = collectText(tree);
        expect(allText).toContain('VOLFORCE');
        expect(allText).toContain('20.000 IMPERIAL IV');
    });

    it('does not display VOLFORCE when null', async () => {
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
        await render(<Profile />);
        const tree = screen.toJSON() as TestRendererJSON;
        const allText = collectText(tree);
        expect(allText).not.toContain('VOLFORCE');
        const icons = findAll(tree, n => n.props?.testID === 'icon-hexagon');
        expect(icons.length).toBe(0);
    });
});
