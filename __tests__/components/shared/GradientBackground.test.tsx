import React from 'react';
import {render} from '@testing-library/react-native';
import {Platform} from 'react-native';
import GradientBackground from '@/components/shared/GradientBackground';

jest.mock('expo-linear-gradient', () => {
    const {createElement} = require('react');
    return {
        LinearGradient: (props: {children?: React.ReactNode; testID?: string}) =>
            createElement('View', {testID: props.testID ?? 'linear-gradient', ...props}, props.children),
    };
});

jest.mock('@/store/theme', () => ({
    useThemeStore: () => ({primaryColor: '#3b82f6'}),
}));

describe('GradientBackground', () => {
    afterEach(() => {
        Platform.OS = 'ios';
    });

    it('renders on native with LinearGradient elements', async () => {
        Platform.OS = 'ios';
        const {toJSON} = await render(<GradientBackground />);
        const json = JSON.stringify(toJSON());
        expect(json).toContain('linear-gradient');
    });

    it('renders on web with a View', async () => {
        Platform.OS = 'web';
        const {toJSON} = await render(<GradientBackground />);
        expect(toJSON()).toBeTruthy();
    });
});
