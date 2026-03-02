import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('@/components/gd/GdDifficulty', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', props)};
});

import Gd from '@/app/main/debug/Gd';

describe('Debug Gd', () => {
    it('renders without crashing', () => {
        const tree = renderer.create(<Gd />).toJSON();
        expect(tree).toBeTruthy();
    });
});
