import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('@/components/shared/GameTabLayout', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', props)};
});

jest.mock('@expo/vector-icons/AntDesign', () => 'AntDesign');
jest.mock('@expo/vector-icons', () => ({Entypo: 'Entypo'}));

import Layout from '@/app/main/gd/_layout';

describe('GD Layout', () => {
    it('renders without crashing', () => {
        const tree = renderer.create(<Layout />).toJSON();
        expect(tree).toBeTruthy();
    });
});
