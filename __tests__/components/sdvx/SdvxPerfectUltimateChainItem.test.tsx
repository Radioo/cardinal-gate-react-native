import React from 'react';
import {render, screen} from '@testing-library/react-native';
import SdvxPerfectUltimateChainItem from '@/components/sdvx/SdvxPerfectUltimateChainItem';

jest.mock('react-native-reanimated', () => {
    const {createElement} = require('react');
    const {View, Text} = require('react-native');
    const AnimatedView = (props: Record<string, unknown>) => createElement(View, props);
    const AnimatedText = (props: Record<string, unknown>) => createElement(Text, props);
    return {
        __esModule: true,
        useSharedValue: (v: number) => ({value: v}),
        useAnimatedStyle: (fn: () => Record<string, unknown>) => fn(),
        withTiming: (v: number) => v,
        withRepeat: (v: number) => v,
        interpolateColor: () => '#000000',
        default: {View: AnimatedView, Text: AnimatedText},
    };
});

describe('SdvxPerfectUltimateChainItem', () => {
    it('renders without crashing', async () => {
        await render(<SdvxPerfectUltimateChainItem/>);
        expect(screen.toJSON()).toBeTruthy();
    });

    it('renders the PUC label', async () => {
        await render(<SdvxPerfectUltimateChainItem/>);
        expect(screen.getByText('PUC')).toBeTruthy();
    });

    it('accepts a style prop', async () => {
        await render(<SdvxPerfectUltimateChainItem style={{marginLeft: 12}}/>);
        expect(screen.toJSON()).toBeTruthy();
    });
});
