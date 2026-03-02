import React from 'react';
import renderer from 'react-test-renderer';
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
        renderItem: (item: string) => <React.Fragment>{item}</React.Fragment>,
    };

    it('renders FullScreenLoader when isPending is true', () => {
        const root = renderer.create(
            <PaginatedPlaysList {...defaultProps} isPending={true}/>
        ).root;
        const loaders = root.findAllByProps({testID: 'loader'});
        expect(loaders.length).toBe(1);
    });

    it('does not render FullScreenLoader when isPending is false', () => {
        const root = renderer.create(
            <PaginatedPlaysList {...defaultProps} isPending={false}/>
        ).root;
        const loaders = root.findAllByProps({testID: 'loader'});
        expect(loaders.length).toBe(0);
    });

    it('renders ErrorScreen when isError is true with an error', () => {
        const root = renderer.create(
            <PaginatedPlaysList
                {...defaultProps}
                isError={true}
                error={new Error('Something went wrong')}
            />
        ).root;
        const errorScreen = root.findByProps({testID: 'error-screen'});
        expect(errorScreen).toBeTruthy();
        expect(errorScreen.props.message).toBe('Something went wrong');
    });

    it('renders ErrorScreen with fallback message when isError is true but error is null', () => {
        const root = renderer.create(
            <PaginatedPlaysList
                {...defaultProps}
                isError={true}
                error={null}
            />
        ).root;
        const errorScreen = root.findByProps({testID: 'error-screen'});
        expect(errorScreen).toBeTruthy();
    });

    it('renders Pagination with correct page info when data is loaded', () => {
        const root = renderer.create(
            <PaginatedPlaysList {...defaultProps} pages={5} page={3}/>
        ).root;
        // Pagination renders a ThemedButton with the page label
        // Find the text "3 / 5" in the tree
        const allText = root.findAllByType('Text' as unknown as React.ComponentClass);
        const pageLabel = allText.find(t => {
            const children = t.props.children;
            return typeof children === 'string' && children.includes('3 / 5');
        });
        expect(pageLabel).toBeTruthy();
    });

    it('renders FlatList when not pending and not error', () => {
        const root = renderer.create(
            <PaginatedPlaysList
                {...defaultProps}
                plays={['Play 1', 'Play 2']}
                pages={2}
                renderItem={(item: string) => <React.Fragment>{item}</React.Fragment>}
            />
        ).root;
        // Should not show loader
        const loaders = root.findAllByProps({testID: 'loader'});
        expect(loaders.length).toBe(0);
        // Should not show error screen
        const errors = root.findAllByProps({testID: 'error-screen'});
        expect(errors.length).toBe(0);
    });
});
