import React from 'react';
import {render, screen} from '@testing-library/react-native';

jest.mock('react-native-gesture-handler', () => {
    const {createElement} = require('react');
    return {GestureHandlerRootView: ({children}: {children: React.ReactNode}) => createElement('View', null, children)};
});

jest.mock('react-native-notifier', () => {
    const {createElement} = require('react');
    return {NotifierWrapper: ({children}: {children: React.ReactNode}) => createElement('View', null, children)};
});

jest.mock('expo-router', () => {
    const {createElement} = require('react');
    return {
        Stack: (props: Record<string, unknown>) => createElement('View', props),
        ErrorBoundaryProps: {},
    };
});

jest.mock('expo-status-bar', () => {
    const {createElement} = require('react');
    return {StatusBar: () => createElement('View')};
});

jest.mock('@dev-plugins/react-query', () => ({useReactQueryDevTools: jest.fn()}));

jest.mock('@/services/query-client', () => {
    const {QueryClient} = require('@tanstack/react-query');
    return {queryClient: new QueryClient({defaultOptions: {queries: {gcTime: 0}}})};
});

jest.mock('react-native-safe-area-context', () => {
    const {createElement} = require('react');
    return {SafeAreaProvider: ({children}: {children: React.ReactNode}) => createElement('View', null, children)};
});

jest.mock('@react-navigation/core', () => {
    const {createElement} = require('react');
    return {ThemeProvider: ({children}: {children: React.ReactNode}) => createElement('View', null, children)};
});

jest.mock('@react-navigation/native', () => ({DarkTheme: {}, DefaultTheme: {}}));
jest.mock('@/hooks/useColorScheme', () => ({useColorScheme: () => 'dark'}));

import Layout, {ErrorBoundary} from '@/app/_layout';

describe('Layout', () => {
    it('renders without crashing', async () => {
        await render(<Layout />);
        expect(screen.toJSON()).toBeTruthy();
    });
});

describe('ErrorBoundary', () => {
    it('renders without crashing', async () => {
        await render(<ErrorBoundary error={new Error('test')} retry={jest.fn()} />);
        expect(screen.toJSON()).toBeTruthy();
    });
});
