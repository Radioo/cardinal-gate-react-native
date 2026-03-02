import React from 'react';
import renderer from 'react-test-renderer';
import ThemedButton from '@/components/themed/ThemedButton';

describe('ThemedButton', () => {
    it('renders with label', () => {
        const tree = renderer.create(<ThemedButton label="Click me" />).toJSON();
        expect(tree).toBeTruthy();
    });

    it('renders in loading state', () => {
        const tree = renderer.create(<ThemedButton label="Loading" loading />).toJSON();
        expect(tree).toBeTruthy();
    });

    it('renders in disabled state', () => {
        const tree = renderer.create(<ThemedButton label="Disabled" disabled />).toJSON();
        expect(tree).toBeTruthy();
    });

    it('renders with icon', () => {
        const tree = renderer.create(
            <ThemedButton icon={<React.Fragment />} />
        ).toJSON();
        expect(tree).toBeTruthy();
    });
});
