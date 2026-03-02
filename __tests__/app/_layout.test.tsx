import React from 'react';
import renderer from 'react-test-renderer';

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
    return {queryClient: new QueryClient()};
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
    it('renders without crashing', () => {
        const tree = renderer.create(<Layout />).toJSON();
        expect(tree).toBeTruthy();
    });
});

describe('ErrorBoundary', () => {
    it('renders without crashing', () => {
        const tree = renderer.create(
            <ErrorBoundary error={new Error('test')} retry={jest.fn()} />
        ).toJSON();
        expect(tree).toBeTruthy();
    });
});
