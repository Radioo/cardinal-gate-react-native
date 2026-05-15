import React from 'react';
import {render, screen, waitFor} from '@testing-library/react-native';
import {TestRendererJSON} from '../../helpers/types';

const mockReplace = jest.fn();
const mockClearSession = jest.fn().mockResolvedValue(undefined);
const mockDisplayMessage = jest.fn();

jest.mock('expo-router', () => ({router: {replace: (...args: unknown[]) => mockReplace(...args)}}));

jest.mock('@/services/auth', () => ({
    clearSession: (...args: unknown[]) => mockClearSession(...args),
}));

jest.mock('@/lib/notifications', () => ({
    displayMessage: (...args: unknown[]) => mockDisplayMessage(...args),
}));

jest.mock('@/components/shared/feedback/FullScreenLoader', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: () => createElement('View', {testID: 'loader'}, createElement('Text', null, 'Loading'))};
});

import Logout from '@/app/main/logout';

describe('Logout', () => {
    beforeEach(() => {
        mockReplace.mockClear();
        mockClearSession.mockClear();
        mockDisplayMessage.mockClear();
        mockClearSession.mockResolvedValue(undefined);
    });

    it('renders a FullScreenLoader', async () => {
        await render(<Logout />);
        const tree = screen.toJSON() as TestRendererJSON;
        expect(tree.props.testID).toBe('loader');
        expect(JSON.stringify(tree)).toContain('Loading');
    });

    it('calls clearSession on mount', async () => {
        await render(<Logout />);
        await waitFor(() => expect(mockClearSession).toHaveBeenCalled());
    });

    it('redirects to /login after clearSession completes', async () => {
        await render(<Logout />);
        await waitFor(() => expect(mockReplace).toHaveBeenCalledWith('/login'));
    });

    it('shows an error toast and still redirects when clearSession rejects', async () => {
        mockClearSession.mockRejectedValueOnce(new Error('secure store offline'));
        await render(<Logout />);
        await waitFor(() => expect(mockDisplayMessage).toHaveBeenCalled());
        expect(mockDisplayMessage.mock.calls[0][1]).toBe('secure store offline');
        await waitFor(() => expect(mockReplace).toHaveBeenCalledWith('/login'));
    });
});
