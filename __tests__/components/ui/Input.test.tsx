import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import {Input} from '@/components/ui/input';

describe('Input', () => {
    it('renders a text input', async () => {
        await render(<Input testID="input" />);
        expect(screen.getByTestId('input')).toBeTruthy();
    });

    it('handles text change', async () => {
        const onChange = jest.fn();
        await render(<Input testID="input" onChangeText={onChange} />);
        fireEvent.changeText(screen.getByTestId('input'), 'hello');
        expect(onChange).toHaveBeenCalledWith('hello');
    });

    it('accepts placeholder text', async () => {
        await render(<Input testID="input" placeholder="Enter text..." />);
        expect(screen.getByPlaceholderText('Enter text...')).toBeTruthy();
    });

    it('renders in disabled state', async () => {
        await render(<Input testID="input" editable={false} />);
        expect(screen.getByTestId('input')).toBeTruthy();
    });
});
