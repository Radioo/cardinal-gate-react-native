import React from 'react';
import renderer from 'react-test-renderer';
import ProfileLayout from '@/components/shared/ProfileLayout';
import {UseQueryResult} from '@tanstack/react-query';

jest.mock('@/components/shared/FullScreenLoader', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: () => createElement('View', {testID: 'loader'})};
});

jest.mock('@/components/shared/ErrorScreen', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', {testID: 'error-screen', ...props})};
});

const createMockQuery = (overrides: Partial<UseQueryResult<string>>): UseQueryResult<string> => ({
    data: undefined as unknown as string,
    error: null as unknown as Error,
    isError: false,
    isPending: true,
    isLoading: true,
    isSuccess: false,
    isLoadingError: false,
    isRefetchError: false,
    status: 'pending',
    fetchStatus: 'fetching',
    isFetching: true,
    isFetched: false,
    isRefetching: false,
    isStale: false,
    isPaused: false,
    isPlaceholderData: false,
    failureCount: 0,
    failureReason: null,
    errorUpdateCount: 0,
    dataUpdatedAt: 0,
    errorUpdatedAt: 0,
    refetch: jest.fn().mockResolvedValue({data: 'test'}),
    promise: Promise.resolve('test'),
    ...overrides,
} as UseQueryResult<string>);

describe('ProfileLayout', () => {
    it('renders FullScreenLoader when query is pending', () => {
        const query = createMockQuery({isPending: true});
        const root = renderer.create(
            <ProfileLayout query={query}>{(data) => <>{data}</>}</ProfileLayout>
        ).root;
        expect(root.findAllByProps({testID: 'loader'})).toHaveLength(1);
    });

    it('renders ErrorScreen when query has error', () => {
        const mockError = new Error('Test error');
        const query = createMockQuery({isPending: false, isError: true, error: mockError});
        const root = renderer.create(
            <ProfileLayout query={query}>{(data) => <>{data}</>}</ProfileLayout>
        ).root;
        const errorScreen = root.findByProps({testID: 'error-screen'});
        expect(errorScreen).toBeTruthy();
    });

    it('renders children with data when query succeeds', () => {
        const query = createMockQuery({
            isPending: false,
            isError: false,
            isSuccess: true,
            data: 'profile-data',
            status: 'success',
        });
        const root = renderer.create(
            <ProfileLayout query={query}>
                {(data) => <>{data}</>}
            </ProfileLayout>
        ).root;
        expect(root.findAllByProps({testID: 'loader'})).toHaveLength(0);
        expect(root.findAllByProps({testID: 'error-screen'})).toHaveLength(0);
    });

    it('renders ScrollView when query succeeds', () => {
        const query = createMockQuery({
            isPending: false,
            isError: false,
            isSuccess: true,
            data: 'test',
            status: 'success',
        });
        const root = renderer.create(
            <ProfileLayout query={query}>{() => <></>}</ProfileLayout>
        ).root;
        const scrollViews = root.findAllByType('RCTScrollView' as unknown as React.ComponentClass);
        expect(scrollViews.length).toBeGreaterThan(0);
    });
});
