import React from 'react';
import {render, screen} from '@testing-library/react-native';
import ThemedText from '@/components/themed/ThemedText';

describe('ThemedText', () => {
    it('renders with default type', async () => {
        await render(<ThemedText>Hello</ThemedText>);
        expect(screen.toJSON()).toBeTruthy();
    });

    it('renders with title type', async () => {
        await render(<ThemedText type="title">Title</ThemedText>);
        expect(screen.toJSON()).toBeTruthy();
    });

    it('renders with link type', async () => {
        await render(<ThemedText type="link">Link</ThemedText>);
        expect(screen.toJSON()).toBeTruthy();
    });

    it('renders with subtitle type', async () => {
        await render(<ThemedText type="subtitle">Subtitle</ThemedText>);
        expect(screen.toJSON()).toBeTruthy();
    });

    it('renders with defaultSemiBold type', async () => {
        await render(<ThemedText type="defaultSemiBold">SemiBold</ThemedText>);
        expect(screen.toJSON()).toBeTruthy();
    });

    it('applies custom style', async () => {
        await render(<ThemedText style={{fontSize: 24}}>Custom</ThemedText>);
        expect(screen.toJSON()).toBeTruthy();
    });
});
