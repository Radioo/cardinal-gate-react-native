import React from 'react';
import {render, screen} from '@testing-library/react-native';
import ApiImage from '@/components/shared/ApiImage';
import {AUTH_HEADER_NAME} from '@/services/auth-headers';

let mockHeaders: Record<string, unknown> = {[AUTH_HEADER_NAME]: 'test'};
let mockIsPending = false;
let mockIsError = false;

jest.mock('@/hooks/queries/useAuthHeaders', () => ({
    __esModule: true,
    default: () => ({isPending: mockIsPending, isError: mockIsError, data: mockHeaders, error: null, refetch: jest.fn()}),
}));

jest.mock('expo-image', () => {
    const {createElement} = require('react');
    return {Image: (props: Record<string, unknown>) => createElement('View', {testID: 'expo-image', ...props})};
});

jest.mock('@/components/shared/feedback/FullScreenLoader', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: () => createElement('View', {testID: 'loader'})};
});

jest.mock('@/components/shared/feedback/ErrorScreen', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', {testID: 'error-screen', ...props})};
});

describe('ApiImage', () => {
    beforeEach(() => {
        mockHeaders = {[AUTH_HEADER_NAME]: 'test'};
        mockIsPending = false;
        mockIsError = false;
    });

    it('renders Image with auth headers for API_URL same-origin requests', async () => {
        await render(<ApiImage url="https://api.test.com/image.png" />);
        const image = screen.getByTestId('expo-image');
        expect(image.props.source).toEqual({
            uri: 'https://api.test.com/image.png',
            headers: {[AUTH_HEADER_NAME]: 'test'},
        });
    });

    it('renders Image without auth headers for third-party origins', async () => {
        await render(<ApiImage url="https://i.kym-cdn.com/some.png" />);
        const image = screen.getByTestId('expo-image');
        expect(image.props.source).toEqual({
            uri: 'https://i.kym-cdn.com/some.png',
            headers: undefined,
        });
    });

    it('passes contentFit and style props to Image', async () => {
        const style = {width: 100, height: 100};
        await render(<ApiImage url="https://api.test.com/img.png" contentFit="cover" style={style} />);
        const image = screen.getByTestId('expo-image');
        expect(image.props.contentFit).toBe('cover');
        expect(image.props.style).toEqual(style);
    });

    it('renders FullScreenLoader when headers are pending for API URLs', async () => {
        mockIsPending = true;
        await render(<ApiImage url="https://api.test.com/img.png" />);
        expect(screen.getAllByTestId('loader')).toHaveLength(1);
        expect(screen.queryAllByTestId('expo-image')).toHaveLength(0);
    });

    it('does not block on header pending for third-party origins', async () => {
        mockIsPending = true;
        await render(<ApiImage url="https://i.kym-cdn.com/img.png" />);
        expect(screen.queryAllByTestId('loader')).toHaveLength(0);
        expect(screen.getAllByTestId('expo-image')).toHaveLength(1);
    });

    it('renders ErrorScreen when headers fail for API URLs', async () => {
        mockIsError = true;
        await render(<ApiImage url="https://api.test.com/img.png" />);
        expect(screen.getAllByTestId('error-screen')).toHaveLength(1);
        expect(screen.queryAllByTestId('expo-image')).toHaveLength(0);
    });
});
