import React from 'react';
import {render, screen} from '@testing-library/react-native';

jest.unmock('@/hooks/useTheme');
jest.mock('@/hooks/useColorScheme', () => ({
    useColorScheme: () => 'dark',
}));

jest.mock('@/store/theme', () => ({
    useThemeStore: () => ({primaryColor: '#f28b28'}),
}));

import useTheme from '@/hooks/useTheme';

function TestComponent() {
    const theme = useTheme();
    return React.createElement('Text', {testID: 'theme'}, JSON.stringify(theme));
}

describe('useTheme', () => {
    it('returns theme object with scheme and colors', async () => {
        await render(React.createElement(TestComponent));
        const textElement = screen.getByTestId('theme');
        const theme = JSON.parse(textElement.props.children);
        expect(theme.scheme).toBe('dark');
        expect(theme).toHaveProperty('text');
        expect(theme).toHaveProperty('background');
        expect(theme).toHaveProperty('primary');
    });
});
