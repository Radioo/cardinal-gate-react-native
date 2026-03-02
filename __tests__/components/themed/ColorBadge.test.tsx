import React from 'react';
import renderer from 'react-test-renderer';
import ColorBadge from '@/components/themed/ColorBadge';

jest.mock('polished', () => ({
    darken: (_amount: number, color: string) => color,
    lighten: (_amount: number, color: string) => color,
}));

describe('ColorBadge', () => {
    it('renders text', () => {
        const tree = renderer.create(<ColorBadge text="CLEAR" color="#00ff00"/>);
        const root = tree.root;
        const textElement = root.findByProps({children: 'CLEAR'});
        expect(textElement).toBeTruthy();
    });

    it('renders with different text', () => {
        const tree = renderer.create(<ColorBadge text="FAILED" color="#ff0000"/>);
        const root = tree.root;
        const textElement = root.findByProps({children: 'FAILED'});
        expect(textElement).toBeTruthy();
    });

    it('renders without crashing', () => {
        const tree = renderer.create(<ColorBadge text="TEST" color="#808080"/>);
        expect(tree.toJSON()).toBeTruthy();
    });
});
