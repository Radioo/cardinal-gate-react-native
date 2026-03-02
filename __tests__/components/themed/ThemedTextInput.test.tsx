import React from 'react';
import renderer from 'react-test-renderer';
import ThemedTextInput from '@/components/themed/ThemedTextInput';

describe('ThemedTextInput', () => {
    it('renders with placeholder', () => {
        const tree = renderer.create(
            <ThemedTextInput placeholder="Enter text"/>
        ).toJSON();
        expect(tree).toBeTruthy();
    });

    it('renders with custom style', () => {
        const tree = renderer.create(
            <ThemedTextInput style={{width: 200}} placeholder="Test"/>
        ).toJSON();
        expect(tree).toBeTruthy();
    });
});
