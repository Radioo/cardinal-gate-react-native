import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {Text} from 'react-native';

let mockWidth = 400;

jest.mock('react-native/Libraries/Utilities/useWindowDimensions', () => ({
    __esModule: true,
    default: () => ({width: mockWidth, height: 800, scale: 1, fontScale: 1}),
}));

import CardGrid from '@/components/shared/layout/CardGrid';

function flattenStyle(style: unknown): Record<string, unknown> {
    const list = Array.isArray(style) ? style : [style];
    return Object.assign({}, ...list.filter(Boolean) as object[]);
}

describe('CardGrid', () => {
    beforeEach(() => {
        mockWidth = 400;
    });

    it('renders children directly on narrow screens (no grid cells)', async () => {
        await render(
            <CardGrid>
                <Text>Card 1</Text>
                <Text>Card 2</Text>
            </CardGrid>
        );
        expect(screen.getByText('Card 1')).toBeTruthy();
        expect(screen.getByText('Card 2')).toBeTruthy();
        expect(screen.queryAllByTestId('card-grid-cell')).toHaveLength(0);
    });

    it('wraps children in grid cells on medium screens', async () => {
        mockWidth = 800;
        await render(
            <CardGrid>
                <Text>Card 1</Text>
                <Text>Card 2</Text>
            </CardGrid>
        );
        const cells = screen.getAllByTestId('card-grid-cell');
        expect(cells).toHaveLength(2);
    });

    it('uses 50% cell width on medium screens (2 columns)', async () => {
        mockWidth = 800;
        await render(
            <CardGrid>
                <Text>Card 1</Text>
                <Text>Card 2</Text>
            </CardGrid>
        );
        const [cell] = screen.getAllByTestId('card-grid-cell');
        expect(flattenStyle(cell.props.style).width).toBe('50%');
    });

    it('uses ~33% cell width on large screens with maxColumns=3', async () => {
        mockWidth = 1200;
        await render(
            <CardGrid maxColumns={3}>
                <Text>Card 1</Text>
                <Text>Card 2</Text>
                <Text>Card 3</Text>
            </CardGrid>
        );
        const [cell] = screen.getAllByTestId('card-grid-cell');
        expect(String(flattenStyle(cell.props.style).width)).toContain('33');
    });

    it('defaults maxColumns to 2 (50% width on large screens)', async () => {
        mockWidth = 1200;
        await render(
            <CardGrid>
                <Text>Card 1</Text>
                <Text>Card 2</Text>
            </CardGrid>
        );
        const [cell] = screen.getAllByTestId('card-grid-cell');
        expect(flattenStyle(cell.props.style).width).toBe('50%');
    });
});
