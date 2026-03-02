import React from 'react';
import {render, screen} from '@testing-library/react-native';
import ThemedCard from '@/components/themed/ThemedCard';
import {Text} from 'react-native';

describe('ThemedCard', () => {
    it('renders without children', async () => {
        await render(<ThemedCard />);
        expect(screen.toJSON()).toBeTruthy();
    });

    it('renders with children', async () => {
        await render(<ThemedCard><Text>Content</Text></ThemedCard>);
        expect(screen.toJSON()).toBeTruthy();
    });

    it('renders with custom style', async () => {
        await render(<ThemedCard style={{margin: 10}}><Text>Styled</Text></ThemedCard>);
        expect(screen.toJSON()).toBeTruthy();
    });
});
