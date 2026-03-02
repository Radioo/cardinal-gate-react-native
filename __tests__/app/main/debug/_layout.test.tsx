import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('@/components/shared/GameTabLayout', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', props)};
});

jest.mock('@expo/vector-icons', () => ({FontAwesome6: 'FontAwesome6', Ionicons: 'Ionicons'}));
jest.mock('@expo/vector-icons/MaterialIcons', () => 'MaterialIcons');

import Layout from '@/app/main/debug/_layout';

describe('Debug Layout', () => {
    it('renders without crashing', () => {
        const tree = renderer.create(<Layout />).toJSON();
        expect(tree).toBeTruthy();
    });
});
