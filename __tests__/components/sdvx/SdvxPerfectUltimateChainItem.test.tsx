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
    it('renders the PUC label', async () => {
        await render(<SdvxPerfectUltimateChainItem/>);
        expect(screen.getByText('PUC')).toBeTruthy();
    });

    it('applies the style prop to the outer chip', async () => {
        await render(<SdvxPerfectUltimateChainItem style={{marginLeft: 12}}/>);
        const text = screen.getByText('PUC');
        // The chip view is the parent of the label View → the label View's parent.
        // Walk up to find the chip with marginLeft.
        let node: {parent: typeof text | null; props?: {style?: unknown}} | null = (text as {parent: typeof text | null}).parent;
        let found = false;
        while (node) {
            const style = node.props?.style;
            const flat = Array.isArray(style) ? style : [style];
            if (flat.some((s: {marginLeft?: number} | undefined) => s && s.marginLeft === 12)) {
                found = true;
                break;
            }
            node = (node as {parent: typeof text | null}).parent;
        }
        expect(found).toBe(true);
    });
});
