import React from 'react';
import renderer from 'react-test-renderer';
import ThemedCard from '@/components/themed/ThemedCard';
import {Text} from 'react-native';

describe('ThemedCard', () => {
    it('renders without children', () => {
        const tree = renderer.create(<ThemedCard />).toJSON();
        expect(tree).toBeTruthy();
    });

    it('renders with children', () => {
        const tree = renderer.create(
            <ThemedCard><Text>Content</Text></ThemedCard>
        ).toJSON();
        expect(tree).toBeTruthy();
    });

    it('renders with custom style', () => {
        const tree = renderer.create(
            <ThemedCard style={{margin: 10}}><Text>Styled</Text></ThemedCard>
        ).toJSON();
        expect(tree).toBeTruthy();
    });
});
