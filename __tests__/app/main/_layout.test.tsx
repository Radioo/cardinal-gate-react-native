import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('expo-router/drawer', () => {
    const {createElement} = require('react');
    const Drawer = ({children}: {children: React.ReactNode}) => createElement('View', null, children);
    Drawer.Screen = (props: Record<string, unknown>) => createElement('View', props);
    return {Drawer};
});

jest.mock('@/hooks/queries/useUserData', () => ({
    __esModule: true,
    default: () => ({data: {profiles: {iidx: true, sdvx: true, gd: true}, developer: false}}),
}));

jest.mock('@expo/vector-icons', () => ({
    Entypo: 'Entypo', FontAwesome6: 'FontAwesome6', Ionicons: 'Ionicons',
}));

jest.mock('@expo/vector-icons/MaterialIcons', () => 'MaterialIcons');

import Layout from '@/app/main/_layout';

describe('Main Layout', () => {
    it('renders without crashing', () => {
        const tree = renderer.create(<Layout />).toJSON();
        expect(tree).toBeTruthy();
    });
});
