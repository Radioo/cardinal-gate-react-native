import React from 'react';
import {render, screen} from '@testing-library/react-native';
import ThemedTextInput from '@/components/themed/ThemedTextInput';

describe('ThemedTextInput', () => {
    it('renders with placeholder', async () => {
        await render(<ThemedTextInput placeholder="Enter text"/>);
        expect(screen.toJSON()).toBeTruthy();
    });

    it('renders with custom style', async () => {
        await render(<ThemedTextInput style={{width: 200}} placeholder="Test"/>);
        expect(screen.toJSON()).toBeTruthy();
    });
});
