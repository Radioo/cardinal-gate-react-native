import React from 'react';
import {render, screen} from '@testing-library/react-native';

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

jest.mock('lucide-react-native', () => ({
    House: 'House', Disc: 'Disc', Hexagon: 'Hexagon', Drum: 'Drum',
    Settings: 'Settings', Bug: 'Bug', LogOut: 'LogOut',
}));

import Layout from '@/app/main/_layout';

describe('Main Layout', () => {
    it('renders without crashing', async () => {
        await render(<Layout />);
        expect(screen.toJSON()).toBeTruthy();
    });
});
