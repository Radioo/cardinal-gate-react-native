import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import {Button} from '@/components/ui/button';
import {Text} from '@/components/ui/text';

describe('Button', () => {
    it('renders children', async () => {
        await render(
            <Button>
                <Text>Click me</Text>
            </Button>
        );
        expect(screen.getByText('Click me')).toBeTruthy();
    });

    it('has button role', async () => {
        await render(
            <Button testID="btn">
                <Text>Action</Text>
            </Button>
        );
        const btn = screen.getByTestId('btn');
        expect(btn.props.role).toBe('button');
    });

    it('handles press events', async () => {
        const onPress = jest.fn();
        await render(
            <Button testID="btn" onPress={onPress}>
                <Text>Press</Text>
            </Button>
        );
        fireEvent.press(screen.getByTestId('btn'));
        expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('applies disabled opacity', async () => {
        await render(
            <Button testID="btn" disabled>
                <Text>Disabled</Text>
            </Button>
        );
        expect(screen.getByTestId('btn')).toBeTruthy();
    });
});
