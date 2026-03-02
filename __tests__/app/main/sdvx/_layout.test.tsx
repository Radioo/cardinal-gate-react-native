import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('@/components/shared/GameTabLayout', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', props)};
});

import Layout from '@/app/main/sdvx/_layout';

describe('SDVX Layout', () => {
    it('renders without crashing', () => {
        const tree = renderer.create(<Layout />).toJSON();
        expect(tree).toBeTruthy();
    });
});
