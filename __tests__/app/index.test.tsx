import React from 'react';
import renderer, {act} from 'react-test-renderer';

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
    let component: renderer.ReactTestRenderer = undefined as unknown as renderer.ReactTestRenderer;
    await act(async () => {
        component = renderer.create(<Root />);
    });
    return component;
}

describe('Root', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('shows loader initially while checking token', () => {
        mockGetSecureValue.mockReturnValue(new Promise(() => {}));
        const tree = renderer.create(<Root />).toJSON() as renderer.ReactTestRendererJSON;
        expect(tree).toBeTruthy();
        expect(tree.props.testID).toBe('loader');
    });

    it('redirects to /main/Home when token exists', async () => {
        mockGetSecureValue.mockResolvedValue('some-token');
        const component = await renderRoot();
        const tree = component.toJSON() as renderer.ReactTestRendererJSON;
        expect(tree).toBeTruthy();
        expect(tree.props.testID).toBe('redirect-/main/Home');
    });

    it('redirects to /login when no token exists', async () => {
        mockGetSecureValue.mockResolvedValue(null);
        const component = await renderRoot();
        const tree = component.toJSON() as renderer.ReactTestRendererJSON;
        expect(tree).toBeTruthy();
        expect(tree.props.testID).toBe('redirect-/login');
    });

    it('redirects to /login on error (catch path)', async () => {
        mockGetSecureValue.mockRejectedValue(new Error('secure store error'));
        const component = await renderRoot();
        const tree = component.toJSON() as renderer.ReactTestRendererJSON;
        expect(tree).toBeTruthy();
        expect(tree.props.testID).toBe('redirect-/login');
    });
});
