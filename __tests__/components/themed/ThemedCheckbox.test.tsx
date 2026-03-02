import React from 'react';
import renderer from 'react-test-renderer';
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
    it('renders without crashing', () => {
        const tree = renderer.create(
            <ThemedCheckbox value={false} onValueChange={jest.fn()} />
        ).toJSON();
        expect(tree).toBeTruthy();
    });

    it('renders in checked state', () => {
        const tree = renderer.create(
            <ThemedCheckbox value={true} onValueChange={jest.fn()} />
        ).toJSON();
        expect(tree).toBeTruthy();
    });
});
