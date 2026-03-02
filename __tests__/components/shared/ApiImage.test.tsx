import React from 'react';
import {render, screen} from '@testing-library/react-native';
import ApiImage from '@/components/shared/ApiImage';

let mockHeaders: Record<string, unknown> = {'CG-Token': 'test'};
let mockIsPending = false;
let mockIsError = false;

jest.mock('@/hooks/useAuthHeaders', () => ({
    __esModule: true,
    default: () => ({isPending: mockIsPending, isError: mockIsError, data: mockHeaders, error: null, refetch: jest.fn()}),
}));

jest.mock('expo-image', () => {
    const {createElement} = require('react');
    return {Image: (props: Record<string, unknown>) => createElement('View', {testID: 'expo-image', ...props})};
});

jest.mock('@/components/shared/FullScreenLoader', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: () => createElement('View', {testID: 'loader'})};
});

jest.mock('@/components/shared/ErrorScreen', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', {testID: 'error-screen', ...props})};
});

describe('ApiImage', () => {
    beforeEach(() => {
        mockHeaders = {'CG-Token': 'test'};
        mockIsPending = false;
        mockIsError = false;
    });

    it('renders Image with correct source uri and auth headers', async () => {
        await render(<ApiImage url="https://example.com/image.png" />);
        const image = screen.getByTestId('expo-image');
        expect(image.props.source).toEqual({
            uri: 'https://example.com/image.png',
            headers: {'CG-Token': 'test'},
        });
    });

    it('passes contentFit and style props to Image', async () => {
        const style = {width: 100, height: 100};
        await render(<ApiImage url="https://example.com/img.png" contentFit="cover" style={style} />);
        const image = screen.getByTestId('expo-image');
        expect(image.props.contentFit).toBe('cover');
        expect(image.props.style).toEqual(style);
    });

    it('renders FullScreenLoader when headers are pending', async () => {
        mockIsPending = true;
        await render(<ApiImage url="https://example.com/img.png" />);
        expect(screen.getAllByTestId('loader')).toHaveLength(1);
        expect(screen.queryAllByTestId('expo-image')).toHaveLength(0);
    });

    it('renders ErrorScreen when headers fail', async () => {
        mockIsError = true;
        await render(<ApiImage url="https://example.com/img.png" />);
        expect(screen.getAllByTestId('error-screen')).toHaveLength(1);
        expect(screen.queryAllByTestId('expo-image')).toHaveLength(0);
    });
});
