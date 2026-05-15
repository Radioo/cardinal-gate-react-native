import React from 'react';
import {render, screen} from '@testing-library/react-native';
import FullScreenLoader from '@/components/shared/feedback/FullScreenLoader';
import {TestRendererJSON} from '../../../helpers/types';

describe('FullScreenLoader', () => {
    it('renders an ActivityIndicator', async () => {
        await render(<FullScreenLoader />);
        expect(screen.UNSAFE_getByType('ActivityIndicator' as never)).toBeTruthy();
    });

    it('forwards the style prop to the outer container', async () => {
        await render(<FullScreenLoader style={{backgroundColor: 'red'}} />);
        const tree = screen.toJSON() as TestRendererJSON;
        const outerStyle = Array.isArray(tree.props.style) ? tree.props.style : [tree.props.style];
        expect(outerStyle).toEqual(expect.arrayContaining([expect.objectContaining({backgroundColor: 'red'})]));
    });
});
