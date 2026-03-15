import React from 'react';
import {render, screen} from '@testing-library/react-native';

type ScreenOptions = {
    title?: string;
    drawerItemStyle?: Record<string, unknown>;
    drawerIcon?: (opts: {color: string}) => React.ReactNode;
};

const capturedScreens: Record<string, ScreenOptions> = {};

jest.mock('expo-router/drawer', () => {
    const {createElement} = require('react');
    const Drawer = ({children}: {children: React.ReactNode}) => createElement('View', null, children);
    Drawer.Screen = ({name, options}: {name: string; options: ScreenOptions}) => {
        capturedScreens[name] = options;
        return createElement('View', {testID: `screen-${name}`});
    };
    return {Drawer};
});

const mockUserData = jest.fn();
jest.mock('@/hooks/queries/useUserData', () => ({
    __esModule: true,
    default: () => mockUserData(),
}));

jest.mock('lucide-react-native', () => ({
    House: 'House', Disc: 'Disc', Hexagon: 'Hexagon', Drum: 'Drum',
    Settings: 'Settings', Bug: 'Bug', LogOut: 'LogOut',
}));

import Layout from '@/app/main/_layout';

beforeEach(() => {
    Object.keys(capturedScreens).forEach(k => delete capturedScreens[k]);
});

describe('Main Layout', () => {
    it('renders all drawer screens', async () => {
        mockUserData.mockReturnValue({data: {profiles: {iidx: true, sdvx: true, gd: true}, developer: true}});
        await render(<Layout />);
        expect(screen.toJSON()).toBeTruthy();
        expect(capturedScreens).toHaveProperty('Home');
        expect(capturedScreens).toHaveProperty('iidx');
        expect(capturedScreens).toHaveProperty('sdvx');
        expect(capturedScreens).toHaveProperty('gd');
        expect(capturedScreens).toHaveProperty('settings');
        expect(capturedScreens).toHaveProperty('debug');
        expect(capturedScreens).toHaveProperty('Logout');
    });

    it('hides game drawer items when profiles are absent', async () => {
        mockUserData.mockReturnValue({data: {profiles: {iidx: null, sdvx: null, gd: null}, developer: false}});
        await render(<Layout />);
        expect(capturedScreens.iidx?.drawerItemStyle).toMatchObject({display: 'none'});
        expect(capturedScreens.sdvx?.drawerItemStyle).toMatchObject({display: 'none'});
        expect(capturedScreens.gd?.drawerItemStyle).toMatchObject({display: 'none'});
    });

    it('shows game drawer items when profiles exist', async () => {
        mockUserData.mockReturnValue({data: {profiles: {iidx: 1, sdvx: 2, gd: 3}, developer: false}});
        await render(<Layout />);
        expect(capturedScreens.iidx?.drawerItemStyle).toMatchObject({display: 'flex'});
        expect(capturedScreens.sdvx?.drawerItemStyle).toMatchObject({display: 'flex'});
        expect(capturedScreens.gd?.drawerItemStyle).toMatchObject({display: 'flex'});
    });

    it('hides debug drawer item when user is not a developer', async () => {
        mockUserData.mockReturnValue({data: {profiles: {iidx: true, sdvx: true, gd: true}, developer: false}});
        await render(<Layout />);
        expect(capturedScreens.debug?.drawerItemStyle).toMatchObject({display: 'none'});
    });

    it('shows debug drawer item when user is a developer', async () => {
        mockUserData.mockReturnValue({data: {profiles: {iidx: true, sdvx: true, gd: true}, developer: true}});
        await render(<Layout />);
        expect(capturedScreens.debug?.drawerItemStyle).toMatchObject({display: 'flex'});
    });
});
