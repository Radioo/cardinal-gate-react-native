import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {TestRendererJSON} from '../../../helpers/types';
import {collectText, findAll} from '../../../helpers/tree-utils';

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

jest.mock('lucide-react-native', () => {
    const {createElement} = require('react');
    const makeIcon = (name: string) => (props: Record<string, unknown>) => createElement('View', {...props, testID: `icon-${name}`});
    return {
        User: makeIcon('user'),
        Hash: makeIcon('hash'),
        Star: makeIcon('star'),
        MousePointerClick: makeIcon('mouse-pointer-click'),
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

import Profile from '@/app/main/iidx/Profile';

describe('IIDX Profile', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('shows FullScreenLoader when pending', async () => {
        mockUseIidxProfile = jest.fn(() => ({data: undefined, isPending: true, isError: false, error: null, refetch: jest.fn()}));
        await render(<Profile />);
        const tree = screen.toJSON() as TestRendererJSON;
        const loaders = findAll(tree, n => n.props?.testID === 'loader');
        expect(loaders.length).toBe(1);
    });

    it('shows ErrorScreen when there is an error', async () => {
        mockUseIidxProfile = jest.fn(() => ({data: undefined, isPending: false, isError: true, error: new Error('IIDX error'), refetch: jest.fn()}));
        await render(<Profile />);
        const tree = screen.toJSON() as TestRendererJSON;
        const errors = findAll(tree, n => n.props?.testID === 'error');
        expect(errors.length).toBe(1);
        expect(JSON.stringify(errors[0])).toContain('IIDX error');
    });

    it('displays DJ name and formatted arcade ID', async () => {
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
        await render(<Profile />);
        const tree = screen.toJSON() as TestRendererJSON;
        const allText = collectText(tree);
        expect(allText).toContain('DJ TURNTABLE');
        expect(allText).toContain('1234-5678');
    });

    it('displays play counts for SP and DP', async () => {
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
        await render(<Profile />);
        const tree = screen.toJSON() as TestRendererJSON;
        const allText = collectText(tree);
        expect(allText.join(' ')).toContain('Play count');
        expect(allText.some(t => t.includes('SP'))).toBe(true);
        expect(allText.some(t => t.includes('DP'))).toBe(true);
    });

    it('displays class information', async () => {
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
        await render(<Profile />);
        const tree = screen.toJSON() as TestRendererJSON;
        const allText = collectText(tree);
        expect(allText.some(t => t.includes('Kaiden'))).toBe(true);
        expect(allText.some(t => t.includes('10th Dan'))).toBe(true);
    });
});
