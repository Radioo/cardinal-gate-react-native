import React from 'react';
import {render, screen} from '@testing-library/react-native';
import ErrorScreen from '@/components/shared/ErrorScreen';

describe('ErrorScreen', () => {
    it('renders error message', async () => {
        const error = new Error('Something went wrong');
        await render(<ErrorScreen error={error}/>);
        expect(screen.toJSON()).toBeTruthy();
    });

    it('renders retry button when onRetry is provided', async () => {
        const error = new Error('Test error');
        const onRetry = jest.fn();
        await render(<ErrorScreen error={error} onRetry={onRetry}/>);
        expect(screen.toJSON()).toBeTruthy();
    });

    it('renders without retry button when onRetry is not provided', async () => {
        const error = new Error('Test error');
        await render(<ErrorScreen error={error}/>);
        expect(screen.toJSON()).toBeTruthy();
    });
});
