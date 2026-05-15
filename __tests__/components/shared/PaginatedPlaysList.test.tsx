import React from 'react';
import {Text} from 'react-native';
import {render, screen} from '@testing-library/react-native';
import PaginatedPlaysList, {computeNumColumns} from '@/components/shared/PaginatedPlaysList';

jest.mock('@/hooks/useUserRefresh', () => ({
    __esModule: true,
    default: () => ({refreshing: false, handleRefresh: jest.fn()}),
}));

jest.mock('lucide-react-native', () => {
    const ReactLib = require('react');
    return {
        ChevronLeft: (props: Record<string, unknown>) => ReactLib.createElement('View', props),
        ChevronRight: (props: Record<string, unknown>) => ReactLib.createElement('View', props),
        ChevronsLeft: (props: Record<string, unknown>) => ReactLib.createElement('View', props),
        ChevronsRight: (props: Record<string, unknown>) => ReactLib.createElement('View', props),
    };
});

jest.mock('@/components/shared/SetPageModal', () => {
    const ReactLib = require('react');
    return () => ReactLib.createElement('View');
});

jest.mock('@/components/shared/FullScreenLoader', () => {
    const ReactLib = require('react');
    return {__esModule: true, default: () => ReactLib.createElement('View', {testID: 'loader'})};
});

jest.mock('@/components/shared/ErrorScreen', () => {
    const ReactLib = require('react');
    return {__esModule: true, default: (props: {error: Error}) => ReactLib.createElement('View', {testID: 'error-screen', message: props.error.message})};
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

    it('renders Pagination with correct page info when data is loaded', async () => {
        await render(<PaginatedPlaysList {...defaultProps} pages={5} page={3}/>);
        expect(screen.getByText('3')).toBeTruthy();
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
        expect(screen.queryAllByTestId('loader').length).toBe(0);
        expect(screen.queryAllByTestId('error-screen').length).toBe(0);
    });

    describe('computeNumColumns', () => {
        it('returns 1 for narrow phone widths', () => {
            expect(computeNumColumns(360)).toBe(1);
            expect(computeNumColumns(379)).toBe(1);
        });

        it('returns 2 once the window is at least twice the min card width', () => {
            expect(computeNumColumns(760)).toBe(2);
            expect(computeNumColumns(800)).toBe(2);
        });

        it('returns 3 at typical desktop widths', () => {
            expect(computeNumColumns(1140)).toBe(3);
            expect(computeNumColumns(1280)).toBe(3);
        });

        it('returns 4 at large desktop widths', () => {
            expect(computeNumColumns(1520)).toBe(4);
            expect(computeNumColumns(1920)).toBe(5);
        });

        it('returns at least 1 column for any positive width', () => {
            expect(computeNumColumns(50)).toBe(1);
            expect(computeNumColumns(1)).toBe(1);
            expect(computeNumColumns(0)).toBe(1);
        });

        it('treats the column boundary exactly at the min card width', () => {
            // Exactly at the threshold floor returns the next column count
            expect(computeNumColumns(380)).toBe(1);
            expect(computeNumColumns(379)).toBe(1);
        });
    });
});
