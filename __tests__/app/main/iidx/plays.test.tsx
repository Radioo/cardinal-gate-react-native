import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {TestRendererJSON} from '../../../helpers/types';

let mockUseIidxPlays: jest.Mock;

jest.mock('@/hooks/queries/useIidxPlays', () => ({
    __esModule: true,
    default: (...args: unknown[]) => mockUseIidxPlays(...args),
}));

jest.mock('@/hooks/usePullToRefresh', () => ({
    __esModule: true,
    default: () => ({refreshing: false, handleRefresh: jest.fn()}),
}));

let capturedPaginatedProps: Record<string, unknown> | null = null;

jest.mock('@/components/shared/layout/PaginatedPlaysList', () => {
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

import Plays from '@/app/main/iidx/plays';

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

    it('forwards the query object to PaginatedPlaysList', async () => {
        const plays = [{id: 1, title: 'Song A'}, {id: 2, title: 'Song B'}];
        const queryResult = {data: {plays, pages: 3}, isPending: false, isError: false, error: null, refetch: jest.fn()};
        mockUseIidxPlays = jest.fn(() => queryResult);
        await render(<Plays />);
        const props = capturedPaginatedProps as Record<string, unknown>;
        expect(props.query).toBe(queryResult);
    });

    it('starts pagination at page 1', async () => {
        mockUseIidxPlays = jest.fn(() => ({data: undefined, isPending: true, isError: false, error: null, refetch: jest.fn()}));
        await render(<Plays />);
        const props = capturedPaginatedProps as Record<string, unknown>;
        expect(props.page).toBe(1);
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
