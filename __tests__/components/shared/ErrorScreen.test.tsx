import React from 'react';
import renderer from 'react-test-renderer';
import ErrorScreen from '@/components/shared/ErrorScreen';

describe('ErrorScreen', () => {
    it('renders error message', () => {
        const error = new Error('Something went wrong');
        const tree = renderer.create(<ErrorScreen error={error}/>);
        expect(tree.toJSON()).toBeTruthy();
    });

    it('renders retry button when onRetry is provided', () => {
        const error = new Error('Test error');
        const onRetry = jest.fn();
        const tree = renderer.create(<ErrorScreen error={error} onRetry={onRetry}/>);
        expect(tree.toJSON()).toBeTruthy();
    });

    it('renders without retry button when onRetry is not provided', () => {
        const error = new Error('Test error');
        const tree = renderer.create(<ErrorScreen error={error}/>);
        expect(tree.toJSON()).toBeTruthy();
    });
});
