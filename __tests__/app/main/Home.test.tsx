import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {TestRendererJSON} from '../../helpers/types';
import {findAll} from '../../helpers/tree-utils';

jest.mock('@/components/shared/PlayCounts', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: () => createElement('View', {testID: 'play-counts'})};
});

import Home from '@/app/main/Home';

describe('Home', () => {
    it('renders a ScrollView as root element', async () => {
        await render(<Home />);
        const tree = screen.toJSON() as TestRendererJSON;
        expect(tree).toBeTruthy();
        expect(tree.type).toBe('RCTScrollView');
    });

    it('contains PlayCounts component', async () => {
        await render(<Home />);
        const tree = screen.toJSON() as TestRendererJSON;
        const playCounts = findAll(tree, n => n.props?.testID === 'play-counts');
        expect(playCounts.length).toBe(1);
    });
});
