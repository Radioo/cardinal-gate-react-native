import React from 'react';
import {render, screen, waitFor} from '@testing-library/react-native';
import {TestRendererJSON} from '../helpers/types';

const mockGetSecureValue = jest.fn();

jest.mock('@/store/secure', () => ({
    getSecureValue: (...args: unknown[]) => mockGetSecureValue(...args),
}));

jest.mock('expo-router', () => {
    const {createElement} = require('react');
    return {
        Redirect: ({href}: {href: string}) => createElement('View', {testID: `redirect-${href}`}),
    };
});

jest.mock('@/components/shared/FullScreenLoader', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: () => createElement('View', {testID: 'loader'})};
});

import Root from '@/app/index';

async function renderRoot() {
    await render(<Root />);
}

describe('Root', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('shows loader initially while checking token', async () => {
        mockGetSecureValue.mockReturnValue(new Promise(() => {}));
        await render(<Root />);
        const tree = screen.toJSON() as TestRendererJSON;
        expect(tree).toBeTruthy();
        expect(tree.props.testID).toBe('loader');
    });

    it('redirects to /main/Home when token exists', async () => {
        mockGetSecureValue.mockResolvedValue('some-token');
        await renderRoot();
        await waitFor(() => {
            const tree = screen.toJSON() as TestRendererJSON;
            expect(tree).toBeTruthy();
            expect(tree.props.testID).toBe('redirect-/main/Home');
        });
    });

    it('redirects to /login when no token exists', async () => {
        mockGetSecureValue.mockResolvedValue(null);
        await renderRoot();
        await waitFor(() => {
            const tree = screen.toJSON() as TestRendererJSON;
            expect(tree).toBeTruthy();
            expect(tree.props.testID).toBe('redirect-/login');
        });
    });

    it('redirects to /login on error (catch path)', async () => {
        mockGetSecureValue.mockRejectedValue(new Error('secure store error'));
        await renderRoot();
        await waitFor(() => {
            const tree = screen.toJSON() as TestRendererJSON;
            expect(tree).toBeTruthy();
            expect(tree.props.testID).toBe('redirect-/login');
        });
    });
});
