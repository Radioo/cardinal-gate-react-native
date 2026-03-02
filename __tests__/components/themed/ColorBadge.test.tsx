import React from 'react';
import {render, screen} from '@testing-library/react-native';
import ColorBadge from '@/components/themed/ColorBadge';

jest.mock('polished', () => ({
    darken: (_amount: number, color: string) => color,
    lighten: (_amount: number, color: string) => color,
}));

describe('ColorBadge', () => {
    it('renders text', async () => {
        await render(<ColorBadge text="CLEAR" color="#00ff00"/>);
        expect(screen.getByText('CLEAR')).toBeTruthy();
    });

    it('renders with different text', async () => {
        await render(<ColorBadge text="FAILED" color="#ff0000"/>);
        expect(screen.getByText('FAILED')).toBeTruthy();
    });

    it('renders without crashing', async () => {
        await render(<ColorBadge text="TEST" color="#808080"/>);
        expect(screen.toJSON()).toBeTruthy();
    });
});
