import React from 'react';
import renderer, {act} from 'react-test-renderer';

const mockReplace = jest.fn();
const mockClearSession = jest.fn().mockResolvedValue(undefined);

jest.mock('expo-router', () => ({router: {replace: (...args: unknown[]) => mockReplace(...args)}}));

jest.mock('@/services/auth', () => ({
    clearSession: (...args: unknown[]) => mockClearSession(...args),
}));

jest.mock('@/components/shared/FullScreenLoader', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: () => createElement('View', {testID: 'loader'}, 'Loading')};
});

import Logout from '@/app/main/Logout';

describe('Logout', () => {
    beforeEach(() => {
        mockReplace.mockClear();
        mockClearSession.mockClear();
        mockClearSession.mockResolvedValue(undefined);
    });

    it('renders a FullScreenLoader', async () => {
        let component: renderer.ReactTestRenderer = undefined as unknown as renderer.ReactTestRenderer;
        await act(async () => {
            component = renderer.create(<Logout />);
        });
        const tree = component.toJSON() as renderer.ReactTestRendererJSON;
        expect(tree.props.testID).toBe('loader');
        expect(tree.children).toContain('Loading');
    });

    it('calls clearSession on mount', async () => {
        await act(async () => {
            renderer.create(<Logout />);
        });
        expect(mockClearSession).toHaveBeenCalled();
    });

    it('redirects to /login after clearSession completes', async () => {
        await act(async () => {
            renderer.create(<Logout />);
        });
        expect(mockReplace).toHaveBeenCalledWith('/login');
    });
});
