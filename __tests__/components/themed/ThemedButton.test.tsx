import React from 'react';
import {render, screen} from '@testing-library/react-native';
import ThemedButton from '@/components/themed/ThemedButton';

describe('ThemedButton', () => {
    it('renders with label', async () => {
        await render(<ThemedButton label="Click me" />);
        expect(screen.toJSON()).toBeTruthy();
    });

    it('renders in loading state', async () => {
        await render(<ThemedButton label="Loading" loading />);
        expect(screen.toJSON()).toBeTruthy();
    });

    it('renders in disabled state', async () => {
        await render(<ThemedButton label="Disabled" disabled />);
        expect(screen.toJSON()).toBeTruthy();
    });

    it('renders with icon', async () => {
        await render(<ThemedButton icon={<React.Fragment />} />);
        expect(screen.toJSON()).toBeTruthy();
    });
});
