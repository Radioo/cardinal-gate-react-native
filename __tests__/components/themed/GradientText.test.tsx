import React from 'react';
import renderer from 'react-test-renderer';
import {Platform} from 'react-native';
import GradientText from '@/components/themed/GradientText';

jest.mock('@react-native-masked-view/masked-view', () => {
    const {createElement} = require('react');
    return {
        __esModule: true,
        default: (props: {children: React.ReactNode}) => createElement('View', {testID: 'masked-view'}, props.children),
    };
});

jest.mock('expo-linear-gradient', () => {
    const {createElement} = require('react');
    return {
        LinearGradient: (props: {children: React.ReactNode; colors?: string[]}) =>
            createElement('View', {testID: 'linear-gradient', colors: props.colors}, props.children),
    };
});

describe('GradientText', () => {
    afterEach(() => {
        Platform.OS = 'ios';
    });

    it('renders children text on native platform', () => {
        Platform.OS = 'ios';
        const root = renderer.create(
            <GradientText colors={['#ff0000', '#0000ff']} style={{fontSize: 16}}>
                Hello Gradient
            </GradientText>
        ).root;
        const textNodes = root.findAllByType('Text' as unknown as React.ComponentClass);
        const allText = textNodes.map(n => n.props.children).flat();
        expect(allText).toContain('Hello Gradient');
    });

    it('uses MaskedView and LinearGradient on native', () => {
        Platform.OS = 'ios';
        const root = renderer.create(
            <GradientText colors={['#ff0000', '#0000ff']} style={{fontSize: 16}}>
                Native Text
            </GradientText>
        ).root;
        const maskedViews = root.findAllByProps({testID: 'masked-view'});
        expect(maskedViews.length).toBe(1);
        const linearGradients = root.findAllByProps({testID: 'linear-gradient'});
        expect(linearGradients.length).toBe(1);
    });

    it('passes colors to LinearGradient on native', () => {
        Platform.OS = 'ios';
        const root = renderer.create(
            <GradientText colors={['#ff0000', '#00ff00']} style={{fontSize: 16}}>
                Colored
            </GradientText>
        ).root;
        const lg = root.findByProps({testID: 'linear-gradient'});
        expect(lg.props.colors).toEqual(['#ff0000', '#00ff00']);
    });

    it('renders a plain Text element on web platform', () => {
        Platform.OS = 'web';
        const root = renderer.create(
            <GradientText colors={['#ff0000', '#00ff00', '#0000ff']} style={{fontSize: 20}}>
                Web Text
            </GradientText>
        ).root;
        // On web, should not use MaskedView or LinearGradient
        const maskedViews = root.findAllByProps({testID: 'masked-view'});
        expect(maskedViews.length).toBe(0);
        // Should render a Text element with children
        const textNodes = root.findAllByType('Text' as unknown as React.ComponentClass);
        expect(textNodes.length).toBeGreaterThanOrEqual(1);
        const allText = textNodes.map(n => n.props.children).flat();
        expect(allText).toContain('Web Text');
    });

    it('applies backgroundColor prop on web', () => {
        Platform.OS = 'web';
        const root = renderer.create(
            <GradientText
                colors={['#ff0000', '#0000ff']}
                style={{fontSize: 16}}
                backgroundColor="#000000"
            >
                BG Text
            </GradientText>
        ).root;
        const textNode = root.findByType('Text' as unknown as React.ComponentClass);
        const flatStyle = [].concat(...(textNode.props.style || []));
        const hasBgColor = flatStyle.some(
            (s: Record<string, unknown> | null) => s && s.backgroundColor === '#000000'
        );
        expect(hasBgColor).toBe(true);
    });
});
