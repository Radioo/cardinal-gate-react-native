import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {TestRendererJSON} from '../../../helpers/types';

let mockUseIidxPlays: jest.Mock;

jest.mock('@/hooks/queries/useIidxPlays', () => ({
    __esModule: true,
    default: (...args: unknown[]) => mockUseIidxPlays(...args),
}));

jest.mock('@/hooks/useUserRefresh', () => ({
    __esModule: true,
    default: () => ({refreshing: false, handleRefresh: jest.fn()}),
}));

let capturedPaginatedProps: Record<string, unknown> | null = null;

jest.mock('@/components/shared/PaginatedPlaysList', () => {
    const {createElement} = require('react');
    return {
        __esModule: true,
        default: (props: Record<string, unknown>) => {
            capturedPaginatedProps = props;
            return createElement('View', {testID: 'paginated-list'});
        },
    };
});

jest.mock('@/components/iidx/IidxPlayRow', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', {testID: 'iidx-play-row', ...props})};
});

import Plays from '@/app/main/iidx/Plays';

describe('IIDX Plays', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        capturedPaginatedProps = null;
    });

    it('renders PaginatedPlaysList', async () => {
        mockUseIidxPlays = jest.fn(() => ({data: {plays: [], pages: 1}, isPending: false, isError: false, error: null, refetch: jest.fn()}));
        await render(<Plays />);
        const tree = screen.toJSON() as TestRendererJSON;
        expect(tree.props.testID).toBe('paginated-list');
    });

    it('passes plays data to PaginatedPlaysList', async () => {
        const plays = [{id: 1, title: 'Song A'}, {id: 2, title: 'Song B'}];
        mockUseIidxPlays = jest.fn(() => ({data: {plays, pages: 3}, isPending: false, isError: false, error: null, refetch: jest.fn()}));
        await render(<Plays />);
        const props = capturedPaginatedProps as Record<string, unknown>;
        expect(props).toBeTruthy();
        expect(props.plays).toEqual(plays);
        expect(props.pages).toBe(3);
    });

    it('defaults to empty plays and page 1 when data is undefined', async () => {
        mockUseIidxPlays = jest.fn(() => ({data: undefined, isPending: true, isError: false, error: null, refetch: jest.fn()}));
        await render(<Plays />);
        const props = capturedPaginatedProps as Record<string, unknown>;
        expect(props).toBeTruthy();
        expect(props.plays).toEqual([]);
        expect(props.pages).toBe(1);
        expect(props.isPending).toBe(true);
    });

    it('passes error state to PaginatedPlaysList', async () => {
        const error = new Error('Failed to load');
        mockUseIidxPlays = jest.fn(() => ({data: undefined, isPending: false, isError: true, error, refetch: jest.fn()}));
        await render(<Plays />);
        const props = capturedPaginatedProps as Record<string, unknown>;
        expect(props.isError).toBe(true);
        expect(props.error).toBe(error);
    });

    it('provides a renderItem function that renders IidxPlayRow', async () => {
        mockUseIidxPlays = jest.fn(() => ({data: {plays: [], pages: 1}, isPending: false, isError: false, error: null, refetch: jest.fn()}));
        await render(<Plays />);
        const props = capturedPaginatedProps as Record<string, unknown>;
        const renderItem = props.renderItem as (play: unknown) => React.ReactElement;
        const element = renderItem({id: 1, title: 'Test'});
        expect(element).toBeTruthy();
        expect((element.props as Record<string, unknown>).play).toEqual({id: 1, title: 'Test'});
    });
});
