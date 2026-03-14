import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {Platform} from 'react-native';
import GradientText from '@/components/themed/GradientText';
import {TestRendererJSON} from '../../helpers/types';

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

    it('renders children text on native platform', async () => {
        Platform.OS = 'ios';
        await render(
            <GradientText colors={['#ff0000', '#0000ff']} style={{fontSize: 16}}>
                Hello Gradient
            </GradientText>
        );
        const json = JSON.stringify(screen.toJSON());
        expect(json).toContain('Hello Gradient');
    });

    it('uses MaskedView and LinearGradient on native', async () => {
        Platform.OS = 'ios';
        await render(
            <GradientText colors={['#ff0000', '#0000ff']} style={{fontSize: 16}}>
                Native Text
            </GradientText>
        );
        expect(screen.getAllByTestId('masked-view').length).toBe(1);
        expect(screen.getAllByTestId('linear-gradient').length).toBe(1);
    });

    it('passes colors to LinearGradient on native', async () => {
        Platform.OS = 'ios';
        await render(
            <GradientText colors={['#ff0000', '#00ff00']} style={{fontSize: 16}}>
                Colored
            </GradientText>
        );
        const lg = screen.getByTestId('linear-gradient');
        expect(lg.props.colors).toEqual(['#ff0000', '#00ff00']);
    });

    it('renders a plain Text element on web platform', async () => {
        Platform.OS = 'web';
        await render(
            <GradientText colors={['#ff0000', '#00ff00', '#0000ff']} style={{fontSize: 20}}>
                Web Text
            </GradientText>
        );
        // On web, should not use MaskedView or LinearGradient
        expect(screen.queryAllByTestId('masked-view').length).toBe(0);
        // Should render a Text element with children
        const json = JSON.stringify(screen.toJSON());
        expect(json).toContain('Web Text');
    });

    it('applies backgroundColor prop on web', async () => {
        Platform.OS = 'web';
        await render(
            <GradientText
                colors={['#ff0000', '#0000ff']}
                style={{fontSize: 16}}
                backgroundColor="#000000"
            >
                BG Text
            </GradientText>
        );
        const tree = screen.toJSON() as TestRendererJSON;
        const json = JSON.stringify(tree);
        expect(json).toContain('"backgroundColor":"#000000"');
    });
});
