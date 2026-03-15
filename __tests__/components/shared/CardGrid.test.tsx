import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {Text} from 'react-native';

let mockWidth = 400;

jest.mock('react-native/Libraries/Utilities/useWindowDimensions', () => ({
    __esModule: true,
    default: () => ({width: mockWidth, height: 800, scale: 1, fontScale: 1}),
}));

import CardGrid from '@/components/shared/CardGrid';

describe('CardGrid', () => {
    beforeEach(() => {
        mockWidth = 400;
    });

    it('renders children directly on narrow screens', async () => {
        await render(
            <CardGrid>
                <Text>Card 1</Text>
                <Text>Card 2</Text>
            </CardGrid>
        );
        expect(screen.getByText('Card 1')).toBeTruthy();
        expect(screen.getByText('Card 2')).toBeTruthy();
        const tree = screen.toJSON();
        expect(Array.isArray(tree)).toBe(true);
    });

    it('wraps children in grid on medium screens', async () => {
        mockWidth = 800;
        await render(
            <CardGrid>
                <Text>Card 1</Text>
                <Text>Card 2</Text>
            </CardGrid>
        );
        expect(screen.getByText('Card 1')).toBeTruthy();
        expect(screen.getByText('Card 2')).toBeTruthy();
        const tree = screen.toJSON();
        expect(Array.isArray(tree)).toBe(false);
    });

    it('uses 2 columns on medium screens with 50% width cells', async () => {
        mockWidth = 800;
        await render(
            <CardGrid>
                <Text>Card 1</Text>
                <Text>Card 2</Text>
            </CardGrid>
        );
        const tree = screen.toJSON() as any;
        const cell = tree.children[0];
        const cellStyle = Array.isArray(cell.props.style)
            ? Object.assign({}, ...cell.props.style)
            : cell.props.style;
        expect(cellStyle.width).toBe('50%');
    });

    it('uses maxColumns on large screens', async () => {
        mockWidth = 1200;
        await render(
            <CardGrid maxColumns={3}>
                <Text>Card 1</Text>
                <Text>Card 2</Text>
                <Text>Card 3</Text>
            </CardGrid>
        );
        const tree = screen.toJSON() as any;
        const cell = tree.children[0];
        const cellStyle = Array.isArray(cell.props.style)
            ? Object.assign({}, ...cell.props.style)
            : cell.props.style;
        expect(cellStyle.width).toContain('33');
    });

    it('defaults maxColumns to 2', async () => {
        mockWidth = 1200;
        await render(
            <CardGrid>
                <Text>Card 1</Text>
                <Text>Card 2</Text>
            </CardGrid>
        );
        const tree = screen.toJSON() as any;
        const cell = tree.children[0];
        const cellStyle = Array.isArray(cell.props.style)
            ? Object.assign({}, ...cell.props.style)
            : cell.props.style;
        expect(cellStyle.width).toBe('50%');
    });
});
