import React from 'react';
import {render, screen} from '@testing-library/react-native';

const capturedTabs: unknown[] = [];
jest.mock('@/components/shared/GameTabLayout', () => {
    const {createElement} = require('react');
    return {
        __esModule: true,
        default: (props: {tabs: unknown[]}) => {
            capturedTabs.length = 0;
            capturedTabs.push(...props.tabs);
            return createElement('View', {testID: 'game-tab-layout'});
        },
    };
});

const mockUseUserData = jest.fn();
jest.mock('@/hooks/queries/useUserData', () => ({
    __esModule: true,
    default: () => mockUseUserData(),
}));

jest.mock('expo-router', () => {
    const React = require('react');
    return {
        Redirect: ({href}: {href: string}) =>
            React.createElement('View', {testID: 'redirect', href}),
    };
});

jest.mock('lucide-react-native', () => ({Wrench: 'Wrench', Drum: 'Drum', Disc: 'Disc', Hexagon: 'Hexagon'}));

import Layout from '@/app/main/debug/_layout';

beforeEach(() => {
    capturedTabs.length = 0;
});

describe('Debug Layout', () => {
    it('renders tabs when user is a developer', async () => {
        mockUseUserData.mockReturnValue({data: {developer: true}});
        await render(<Layout />);
        expect(screen.getByTestId('game-tab-layout')).toBeTruthy();
        expect(capturedTabs).toHaveLength(4);
    });

    it('redirects non-developer users to Home', async () => {
        mockUseUserData.mockReturnValue({data: {developer: false}});
        await render(<Layout />);
        expect(screen.getByTestId('redirect')).toBeTruthy();
    });

    it('renders tabs while data is loading (data undefined)', async () => {
        mockUseUserData.mockReturnValue({data: undefined});
        await render(<Layout />);
        expect(screen.getByTestId('game-tab-layout')).toBeTruthy();
    });
});
