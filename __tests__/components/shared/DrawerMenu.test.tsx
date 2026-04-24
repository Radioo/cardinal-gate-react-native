import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';

const mockReplace = jest.fn();
const mockUserData = jest.fn();
let mockPathname = '/main/Home';

jest.mock('expo-router', () => ({
    router: {replace: (...args: unknown[]) => mockReplace(...args)},
    usePathname: () => mockPathname,
}));

jest.mock('react-native-gesture-handler/ReanimatedDrawerLayout', () => {
    const {createElement, forwardRef} = require('react');
    const Comp = forwardRef(({children, renderNavigationView}: {children: React.ReactNode; renderNavigationView: () => React.ReactNode}, _ref: unknown) => {
        return createElement('View', null, createElement('View', {testID: 'drawer-nav'}, renderNavigationView()), children);
    });
    return {
        __esModule: true,
        default: Comp,
        DrawerPosition: {LEFT: 0, RIGHT: 1},
        DrawerType: {FRONT: 0, BACK: 1, SLIDE: 2},
    };
});

jest.mock('react-native-safe-area-context', () => {
    const {createElement} = require('react');
    return {SafeAreaView: ({children}: {children: React.ReactNode}) => createElement('View', null, children)};
});

jest.mock('@/hooks/useTheme', () => ({
    __esModule: true,
    default: () => ({background: '#000', text: '#fff', primary: '#f00', scheme: 'dark'}),
}));

jest.mock('@/hooks/queries/useUserData', () => ({
    __esModule: true,
    default: () => mockUserData(),
}));

jest.mock('lucide-react-native', () => ({
    House: 'House', Disc: 'Disc', Hexagon: 'Hexagon', Drum: 'Drum',
    Settings: 'Settings', Bug: 'Bug', LogOut: 'LogOut', Menu: 'Menu',
}));

import DrawerMenu from '@/components/shared/DrawerMenu';

beforeEach(() => {
    mockReplace.mockClear();
    mockUserData.mockReset();
    mockPathname = '/main/Home';
});

describe('DrawerMenu', () => {
    it('shows all items when profiles are present and user is developer', () => {
        mockUserData.mockReturnValue({data: {profiles: {iidx: 1, sdvx: 2, gd: 3}, developer: true}});
        render(<DrawerMenu><></></DrawerMenu>);
        expect(screen.getByText('Home')).toBeTruthy();
        expect(screen.getByText('beatmania IIDX')).toBeTruthy();
        expect(screen.getByText('SOUND VOLTEX')).toBeTruthy();
        expect(screen.getByText('GITADORA')).toBeTruthy();
        expect(screen.getByText('Settings')).toBeTruthy();
        expect(screen.getByText('Debug')).toBeTruthy();
        expect(screen.getByText('Logout')).toBeTruthy();
    });

    it('hides game items when profiles are absent', () => {
        mockUserData.mockReturnValue({data: {profiles: {iidx: null, sdvx: null, gd: null}, developer: false}});
        render(<DrawerMenu><></></DrawerMenu>);
        expect(screen.queryByText('beatmania IIDX')).toBeNull();
        expect(screen.queryByText('SOUND VOLTEX')).toBeNull();
        expect(screen.queryByText('GITADORA')).toBeNull();
    });

    it('hides debug item when user is not a developer', () => {
        mockUserData.mockReturnValue({data: {profiles: {iidx: 1, sdvx: 2, gd: 3}, developer: false}});
        render(<DrawerMenu><></></DrawerMenu>);
        expect(screen.queryByText('Debug')).toBeNull();
    });

    it('navigates and closes drawer when an item is pressed', () => {
        mockUserData.mockReturnValue({data: {profiles: {iidx: 1, sdvx: 2, gd: 3}, developer: true}});
        render(<DrawerMenu><></></DrawerMenu>);
        fireEvent.press(screen.getByText('beatmania IIDX'));
        expect(mockReplace).toHaveBeenCalledWith('/main/iidx/Profile');
    });
});
