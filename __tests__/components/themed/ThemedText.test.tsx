import React from 'react';
import renderer from 'react-test-renderer';
import ThemedText from '@/components/themed/ThemedText';

describe('ThemedText', () => {
    it('renders with default type', () => {
        const tree = renderer.create(<ThemedText>Hello</ThemedText>).toJSON();
        expect(tree).toBeTruthy();
    });

    it('renders with title type', () => {
        const tree = renderer.create(<ThemedText type="title">Title</ThemedText>).toJSON();
        expect(tree).toBeTruthy();
    });

    it('renders with link type', () => {
        const tree = renderer.create(<ThemedText type="link">Link</ThemedText>).toJSON();
        expect(tree).toBeTruthy();
    });

    it('renders with subtitle type', () => {
        const tree = renderer.create(<ThemedText type="subtitle">Subtitle</ThemedText>).toJSON();
        expect(tree).toBeTruthy();
    });

    it('renders with defaultSemiBold type', () => {
        const tree = renderer.create(<ThemedText type="defaultSemiBold">SemiBold</ThemedText>).toJSON();
        expect(tree).toBeTruthy();
    });

    it('applies custom style', () => {
        const tree = renderer.create(
            <ThemedText style={{fontSize: 24}}>Custom</ThemedText>
        ).toJSON();
        expect(tree).toBeTruthy();
    });
});
