import React from 'react';
import renderer from 'react-test-renderer';
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

    it('renders Image with correct source uri and auth headers', () => {
        const root = renderer.create(
            <ApiImage url="https://example.com/image.png" />
        ).root;
        const image = root.findByProps({testID: 'expo-image'});
        expect(image.props.source).toEqual({
            uri: 'https://example.com/image.png',
            headers: {'CG-Token': 'test'},
        });
    });

    it('passes contentFit and style props to Image', () => {
        const style = {width: 100, height: 100};
        const root = renderer.create(
            <ApiImage url="https://example.com/img.png" contentFit="cover" style={style} />
        ).root;
        const image = root.findByProps({testID: 'expo-image'});
        expect(image.props.contentFit).toBe('cover');
        expect(image.props.style).toEqual(style);
    });

    it('renders FullScreenLoader when headers are pending', () => {
        mockIsPending = true;
        const root = renderer.create(
            <ApiImage url="https://example.com/img.png" />
        ).root;
        expect(root.findAllByProps({testID: 'loader'})).toHaveLength(1);
        expect(root.findAllByProps({testID: 'expo-image'})).toHaveLength(0);
    });

    it('renders ErrorScreen when headers fail', () => {
        mockIsError = true;
        const root = renderer.create(
            <ApiImage url="https://example.com/img.png" />
        ).root;
        expect(root.findAllByProps({testID: 'error-screen'})).toHaveLength(1);
        expect(root.findAllByProps({testID: 'expo-image'})).toHaveLength(0);
    });
});
