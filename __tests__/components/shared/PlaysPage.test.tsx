import React from 'react';
import renderer from 'react-test-renderer';

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

import PlaysPage from '@/components/shared/PlaysPage';

describe('PlaysPage', () => {
    beforeEach(() => {
        capturedPaginatedProps = null;
    });

    it('renders PaginatedPlaysList', () => {
        const useQuery = jest.fn(() => ({data: {plays: [], pages: 1}, isPending: false, isError: false, error: null, refetch: jest.fn()}));
        const tree = renderer.create(
            <PlaysPage useQuery={useQuery as never} renderItem={() => <></>}/>
        ).toJSON() as renderer.ReactTestRendererJSON;
        expect(tree.props.testID).toBe('paginated-list');
    });

    it('passes query data to PaginatedPlaysList', () => {
        const plays = [{id: 1}, {id: 2}];
        const useQuery = jest.fn(() => ({data: {plays, pages: 3}, isPending: false, isError: false, error: null, refetch: jest.fn()}));
        renderer.create(<PlaysPage useQuery={useQuery as never} renderItem={() => <></>}/>);
        expect(capturedPaginatedProps).toBeTruthy();
        expect((capturedPaginatedProps as Record<string, unknown>).plays).toEqual(plays);
        expect((capturedPaginatedProps as Record<string, unknown>).pages).toBe(3);
    });

    it('defaults to empty plays and page 1 when data is undefined', () => {
        const useQuery = jest.fn(() => ({data: undefined, isPending: true, isError: false, error: null, refetch: jest.fn()}));
        renderer.create(<PlaysPage useQuery={useQuery as never} renderItem={() => <></>}/>);
        expect((capturedPaginatedProps as Record<string, unknown>).plays).toEqual([]);
        expect((capturedPaginatedProps as Record<string, unknown>).pages).toBe(1);
        expect((capturedPaginatedProps as Record<string, unknown>).isPending).toBe(true);
    });

    it('calls useQuery with page 1 initially', () => {
        const useQuery = jest.fn(() => ({data: {plays: [], pages: 1}, isPending: false, isError: false, error: null, refetch: jest.fn()}));
        renderer.create(<PlaysPage useQuery={useQuery as never} renderItem={() => <></>}/>);
        expect(useQuery).toHaveBeenCalledWith(1);
    });
});
