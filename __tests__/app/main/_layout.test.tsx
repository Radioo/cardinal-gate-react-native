import React from 'react';
import {render, screen} from '@testing-library/react-native';

type ScreenOptions = {
    title?: string;
};

const capturedScreens: Record<string, ScreenOptions> = {};

jest.mock('expo-router', () => {
    const {createElement} = require('react');
    const Stack = ({children}: {children: React.ReactNode}) => createElement('View', null, children);
    Stack.Screen = ({name, options}: {name: string; options: ScreenOptions}) => {
        capturedScreens[name] = options;
        return createElement('View', {testID: `screen-${name}`});
    };
    return {Stack};
});

jest.mock('@/components/shared/DrawerMenu', () => {
    const {createElement} = require('react');
    return {
        __esModule: true,
        default: ({children}: {children: React.ReactNode}) => createElement('View', null, children),
        HamburgerButton: () => createElement('View', {testID: 'hamburger'}),
    };
});

import Layout from '@/app/main/_layout';

beforeEach(() => {
    Object.keys(capturedScreens).forEach(k => delete capturedScreens[k]);
});

describe('Main Layout', () => {
    it('registers all stack screens with titles', async () => {
        await render(<Layout />);
        expect(screen.toJSON()).toBeTruthy();
        expect(capturedScreens.Home).toMatchObject({title: 'Home'});
        expect(capturedScreens.iidx).toMatchObject({title: 'beatmania IIDX'});
        expect(capturedScreens.sdvx).toMatchObject({title: 'SOUND VOLTEX'});
        expect(capturedScreens.gd).toMatchObject({title: 'GITADORA'});
        expect(capturedScreens.settings).toMatchObject({title: 'Settings'});
        expect(capturedScreens.debug).toMatchObject({title: 'Debug'});
        expect(capturedScreens.Logout).toMatchObject({title: 'Logout'});
    });
});
