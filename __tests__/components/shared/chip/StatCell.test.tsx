import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {Text} from 'react-native';
import {TestRendererJSON} from '../../../helpers/types';
import {collectText} from '../../../helpers/tree-utils';
import StatCell from '@/components/shared/chip/StatCell';

jest.mock('@/hooks/useTheme', () => ({
    __esModule: true,
    default: () => ({text: '#000000', primary: '#ff0000'}),
}));

describe('StatCell', () => {
    it('renders the label and children', () => {
        render(
            <StatCell label="GRADE">
                <Text>AAA</Text>
            </StatCell>,
        );
        const tree = screen.toJSON() as TestRendererJSON;
        const texts = collectText(tree);
        expect(texts).toContain('GRADE');
        expect(texts).toContain('AAA');
    });

    it('applies center alignment by default', () => {
        render(
            <StatCell label="SCORE">
                <Text>123</Text>
            </StatCell>,
        );
        const tree = screen.toJSON() as TestRendererJSON;
        const outer = tree as {props?: {className?: string}};
        expect(outer.props?.className).toContain('items-center');
    });

    it('applies left alignment when requested', () => {
        render(
            <StatCell label="SCORE" align="left">
                <Text>123</Text>
            </StatCell>,
        );
        const tree = screen.toJSON() as TestRendererJSON;
        const outer = tree as {props?: {className?: string}};
        expect(outer.props?.className).toContain('items-start');
    });

    it('applies right alignment when requested', () => {
        render(
            <StatCell label="SCORE" align="right">
                <Text>123</Text>
            </StatCell>,
        );
        const tree = screen.toJSON() as TestRendererJSON;
        const outer = tree as {props?: {className?: string}};
        expect(outer.props?.className).toContain('items-end');
    });
});
