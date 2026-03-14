import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {Card} from '@/components/ui/card';
import {Text} from '@/components/ui/text';

describe('Card', () => {
    it('renders children', async () => {
        await render(
            <Card>
                <Text>Card content</Text>
            </Card>
        );
        expect(screen.getByText('Card content')).toBeTruthy();
    });

    it('provides text class context for foreground color', async () => {
        await render(
            <Card testID="card">
                <Text>Styled text</Text>
            </Card>
        );
        expect(screen.getByText('Styled text')).toBeTruthy();
    });
});
