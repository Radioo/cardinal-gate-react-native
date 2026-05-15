import React from 'react';
import {render, screen} from '@testing-library/react-native';
import Chip from '@/components/shared/chip/Chip';
import {collectText} from '../../../helpers/tree-utils';
import {TestRendererJSON} from '../../../helpers/types';

describe('Chip', () => {
    it('renders a single segment with label text', () => {
        render(
            <Chip
                height={22}
                border="#000"
                segments={[{text: 'CLEAR', background: '#39c44d', textColor: '#fff'}]}
            />,
        );
        const tree = screen.toJSON() as TestRendererJSON;
        expect(collectText(tree)).toContain('CLEAR');
    });

    it('renders all segments in order', () => {
        render(
            <Chip
                height={22}
                border="#000"
                segments={[
                    {text: 'SP', background: '#aaa', textColor: '#000', textStyle: 'stamp'},
                    {text: 'NORMAL', background: '#bbb', textColor: '#000'},
                    {text: '07', background: '#ccc', textColor: '#fff', textStyle: 'mono'},
                ]}
            />,
        );
        const tree = screen.toJSON() as TestRendererJSON;
        const texts = collectText(tree);
        expect(texts).toContain('SP');
        expect(texts).toContain('NORMAL');
        expect(texts).toContain('07');
    });

    it('applies the border color to the outer chip', () => {
        render(
            <Chip
                height={22}
                border="#ff0000"
                segments={[{text: 'X', background: '#000', textColor: '#fff'}]}
            />,
        );
        const tree = screen.toJSON() as TestRendererJSON;
        const outerStyles = Array.isArray(tree.props.style) ? tree.props.style : [tree.props.style];
        const merged = Object.assign({}, ...outerStyles.filter(Boolean) as object[]) as {borderColor?: string};
        expect(merged.borderColor).toBe('#ff0000');
    });
});
