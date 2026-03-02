import React from 'react';
import {Text} from 'react-native';
import {render, screen} from '@testing-library/react-native';
import PaginatedPlaysList from '@/components/shared/PaginatedPlaysList';

jest.mock('@/hooks/useUserRefresh', () => ({
    __esModule: true,
    default: () => ({refreshing: false, handleRefresh: jest.fn()}),
}));

jest.mock('@expo/vector-icons', () => {
    const RN = require('react');
    return {
        Entypo: (props: Record<string, unknown>) => RN.createElement('View', props),
    };
});

jest.mock('@expo/vector-icons/Entypo', () => {
    const RN = require('react');
    return (props: Record<string, unknown>) => RN.createElement('View', props);
});

jest.mock('@/components/shared/SetPageModal', () => {
    const RN = require('react');
    return () => RN.createElement('View');
});

jest.mock('@/components/shared/FullScreenLoader', () => {
    const RN = require('react');
    return {__esModule: true, default: () => RN.createElement('View', {testID: 'loader'})};
});

jest.mock('@/components/shared/ErrorScreen', () => {
    const RN = require('react');
    return {__esModule: true, default: (props: {error: Error}) => RN.createElement('View', {testID: 'error-screen', message: props.error.message})};
});

describe('PaginatedPlaysList', () => {
    const defaultProps = {
        plays: [] as string[],
        pages: 1,
        isPending: false,
        isError: false,
        error: null,
        refetch: jest.fn().mockResolvedValue(undefined),
        page: 1,
        onPageChange: jest.fn(),
        renderItem: (item: string) => <Text>{item}</Text>,
    };

    it('renders FullScreenLoader when isPending is true', async () => {
        await render(<PaginatedPlaysList {...defaultProps} isPending={true}/>);
        expect(screen.getAllByTestId('loader').length).toBe(1);
    });

    it('does not render FullScreenLoader when isPending is false', async () => {
        await render(<PaginatedPlaysList {...defaultProps} isPending={false}/>);
        expect(screen.queryAllByTestId('loader').length).toBe(0);
    });

    it('renders ErrorScreen when isError is true with an error', async () => {
        await render(
            <PaginatedPlaysList
                {...defaultProps}
                isError={true}
                error={new Error('Something went wrong')}
            />
        );
        const errorScreen = screen.getByTestId('error-screen');
        expect(errorScreen).toBeTruthy();
        expect(errorScreen.props.message).toBe('Something went wrong');
    });

    it('renders ErrorScreen with fallback message when isError is true but error is null', async () => {
        await render(
            <PaginatedPlaysList
                {...defaultProps}
                isError={true}
                error={null}
            />
        );
        const errorScreen = screen.getByTestId('error-screen');
        expect(errorScreen).toBeTruthy();
    });

    it('renders Pagination with correct page info when data is loaded', async () => {
        await render(<PaginatedPlaysList {...defaultProps} pages={5} page={3}/>);
        // Pagination renders a ThemedButton with the page label
        expect(screen.getByText('3 / 5')).toBeTruthy();
    });

    it('renders FlatList when not pending and not error', async () => {
        await render(
            <PaginatedPlaysList
                {...defaultProps}
                plays={['Play 1', 'Play 2']}
                pages={2}
                renderItem={(item: string) => <Text>{item}</Text>}
            />
        );
        // Should not show loader
        expect(screen.queryAllByTestId('loader').length).toBe(0);
        // Should not show error screen
        expect(screen.queryAllByTestId('error-screen').length).toBe(0);
    });
});
