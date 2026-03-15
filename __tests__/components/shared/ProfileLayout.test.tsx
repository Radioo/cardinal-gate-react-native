import React from 'react';
import {ScrollView, Text} from 'react-native';
import {render, screen} from '@testing-library/react-native';
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
    it('renders FullScreenLoader when query is pending', async () => {
        const query = createMockQuery({isPending: true});
        await render(<ProfileLayout query={query}>{(data) => <Text>{data}</Text>}</ProfileLayout>);
        expect(screen.getAllByTestId('loader')).toHaveLength(1);
    });

    it('renders ErrorScreen when query has error', async () => {
        const mockError = new Error('Test error');
        const query = createMockQuery({isPending: false, isError: true, error: mockError});
        await render(<ProfileLayout query={query}>{(data) => <Text>{data}</Text>}</ProfileLayout>);
        const errorScreen = screen.getByTestId('error-screen');
        expect(errorScreen).toBeTruthy();
    });

    it('renders children with data when query succeeds', async () => {
        const query = createMockQuery({
            isPending: false,
            isError: false,
            isSuccess: true,
            data: 'profile-data',
            status: 'success',
        });
        await render(
            <ProfileLayout query={query}>
                {(data) => <Text>{data}</Text>}
            </ProfileLayout>
        );
        expect(screen.queryAllByTestId('loader')).toHaveLength(0);
        expect(screen.queryAllByTestId('error-screen')).toHaveLength(0);
    });

    it('renders ScrollView when query succeeds', async () => {
        const query = createMockQuery({
            isPending: false,
            isError: false,
            isSuccess: true,
            data: 'test',
            status: 'success',
        });
        await render(<ProfileLayout query={query}>{() => <></>}</ProfileLayout>);
        expect(screen.UNSAFE_getByType(ScrollView)).toBeTruthy();
    });
});
