import React from 'react';
import {render, screen} from '@testing-library/react-native';
import ThemedCheckbox from '@/components/themed/ThemedCheckbox';

jest.mock('expo-checkbox', () => {
    const {createElement} = require('react');
    const {View} = require('react-native');
    return {
        __esModule: true,
        Checkbox: (props: Record<string, unknown>) => createElement(View, props),
    };
});

describe('ThemedCheckbox', () => {
    it('renders without crashing', async () => {
        await render(<ThemedCheckbox value={false} onValueChange={jest.fn()} />);
        expect(screen.toJSON()).toBeTruthy();
    });

    it('renders in checked state', async () => {
        await render(<ThemedCheckbox value={true} onValueChange={jest.fn()} />);
        expect(screen.toJSON()).toBeTruthy();
    });
});
