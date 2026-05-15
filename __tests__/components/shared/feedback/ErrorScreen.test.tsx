import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import ErrorScreen from '@/components/shared/feedback/ErrorScreen';

describe('ErrorScreen', () => {
    it('renders the error message', async () => {
        await render(<ErrorScreen error={new Error('Something went wrong')}/>);
        expect(screen.getByText('Something went wrong')).toBeTruthy();
    });

    it('renders a Retry button when onRetry is provided', async () => {
        await render(<ErrorScreen error={new Error('Test error')} onRetry={jest.fn()}/>);
        expect(screen.getByText('Retry')).toBeTruthy();
    });

    it('invokes onRetry when the Retry button is pressed', async () => {
        const onRetry = jest.fn();
        await render(<ErrorScreen error={new Error('Test error')} onRetry={onRetry}/>);
        fireEvent.press(screen.getByText('Retry'));
        expect(onRetry).toHaveBeenCalled();
    });

    it('omits the Retry button when onRetry is not provided', async () => {
        await render(<ErrorScreen error={new Error('Test error')}/>);
        expect(screen.queryByText('Retry')).toBeNull();
    });
});
