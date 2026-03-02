import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('@/components/iidx/IidxDifficulty', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', props)};
});

import Iidx from '@/app/main/debug/Iidx';

describe('Debug Iidx', () => {
    it('renders without crashing', () => {
        const tree = renderer.create(<Iidx />).toJSON();
        expect(tree).toBeTruthy();
    });
});
