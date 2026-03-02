import React from 'react';
import renderer from 'react-test-renderer';
import IidxFullComboClearTypeItem from '@/components/iidx/IidxFullComboClearTypeItem';

jest.mock('react-native-reanimated', () => {
    const {createElement} = require('react');
    const {View} = require('react-native');
    const AnimatedView = (props: Record<string, unknown>) => createElement(View, props);
    return {
        __esModule: true,
        useSharedValue: (v: number) => ({value: v}),
        useAnimatedStyle: (fn: () => Record<string, unknown>) => fn(),
        withTiming: (v: number) => v,
        withRepeat: (v: number) => v,
        interpolateColor: () => '#000000',
        default: {View: AnimatedView},
    };
});

describe('IidxFullComboClearTypeItem', () => {
    it('renders without crashing', () => {
        const tree = renderer.create(
            <IidxFullComboClearTypeItem/>
        ).toJSON();
        expect(tree).toBeTruthy();
    });
});
