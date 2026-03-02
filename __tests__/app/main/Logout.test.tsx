import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {TestRendererJSON} from '../../helpers/types';

const mockReplace = jest.fn();
const mockClearSession = jest.fn().mockResolvedValue(undefined);

jest.mock('expo-router', () => ({router: {replace: (...args: unknown[]) => mockReplace(...args)}}));

jest.mock('@/services/auth', () => ({
    clearSession: (...args: unknown[]) => mockClearSession(...args),
}));

jest.mock('@/components/shared/FullScreenLoader', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: () => createElement('View', {testID: 'loader'}, createElement('Text', null, 'Loading'))};
});

import Logout from '@/app/main/Logout';

describe('Logout', () => {
    beforeEach(() => {
        mockReplace.mockClear();
        mockClearSession.mockClear();
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
        expect(mockClearSession).toHaveBeenCalled();
    });

    it('redirects to /login after clearSession completes', async () => {
        await render(<Logout />);
        expect(mockReplace).toHaveBeenCalledWith('/login');
    });
});
