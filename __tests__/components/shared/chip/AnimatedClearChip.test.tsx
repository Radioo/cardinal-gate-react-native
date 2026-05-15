import React from 'react';
import {render, screen} from '@testing-library/react-native';
import AnimatedClearChip from '@/components/shared/chip/AnimatedClearChip';

jest.mock('react-native-reanimated', () => {
    const {createElement} = require('react');
    const {View, Text} = require('react-native');
    return {
        __esModule: true,
        useSharedValue: (v: number) => ({value: v}),
        useAnimatedStyle: (fn: () => Record<string, unknown>) => fn(),
        withTiming: (v: number) => v,
        withRepeat: (v: number) => v,
        interpolateColor: () => '#000000',
        default: {
            View: (props: Record<string, unknown>) => createElement(View, props),
            Text: (props: Record<string, unknown>) => createElement(Text, props),
        },
    };
});

const LIGHT = {bg: ['#a', '#b', '#c', '#a'], text: ['#x', '#y', '#z', '#x'], border: ['#p', '#q', '#r', '#p']};
const DARK = {bg: ['#1', '#2', '#3', '#1'], text: ['#4', '#5', '#6', '#4'], border: ['#7', '#8', '#9', '#7']};

describe('AnimatedClearChip', () => {
    it('renders the supplied label', async () => {
        await render(<AnimatedClearChip label="HELLO" height={22} light={LIGHT} dark={DARK}/>);
        expect(screen.getByText('HELLO')).toBeTruthy();
    });

    it('forwards the style prop to the outer chip', async () => {
        await render(
            <AnimatedClearChip label="X" height={22} light={LIGHT} dark={DARK} style={{marginLeft: 7}}/>,
        );
        const text = screen.getByText('X');
        let node: {parent: typeof text | null; props?: {style?: unknown}} | null = (text as {parent: typeof text | null}).parent;
        let found = false;
        while (node) {
            const style = node.props?.style;
            const flat = Array.isArray(style) ? style : [style];
            if (flat.some((s: {marginLeft?: number} | undefined) => s && s.marginLeft === 7)) {
                found = true;
                break;
            }
            node = (node as {parent: typeof text | null}).parent;
        }
        expect(found).toBe(true);
    });
});
