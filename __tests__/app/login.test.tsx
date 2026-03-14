import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react-native';
import {TestRendererJSON} from '../helpers/types';

jest.mock('expo-router', () => ({
    router: {replace: jest.fn()},
    Stack: Object.assign(
        require('react').createElement.bind(null, 'View'),
        {Screen: (p: Record<string, unknown>) => require('react').createElement('View', p)}
    ),
}));

jest.mock('expo-device', () => ({deviceName: 'Test Device'}));
jest.mock('@/services/api', () => ({__esModule: true, fetchApi: jest.fn()}));
jest.mock('@/services/auth', () => ({setAuthToken: jest.fn(), clearSession: jest.fn().mockResolvedValue(undefined)}));
jest.mock('@/services/message', () => ({displayMessage: jest.fn()}));

jest.mock('@/assets/svg/Logo', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', {...props, testID: 'logo'})};
});

import {fetchApi} from '@/services/api';
import {setAuthToken} from '@/services/auth';
import {displayMessage} from '@/services/message';
import {MessageSeverity} from '@/enums/message-severity';
import {router} from 'expo-router';
import LoginScreen from '@/app/login';

function findAllInTree(nodes: (TestRendererJSON | string)[], predicate: (n: TestRendererJSON) => boolean): TestRendererJSON[] {
    const results: TestRendererJSON[] = [];
    for (const node of nodes) {
        if (typeof node === 'string') continue;
        if (predicate(node)) results.push(node);
        if (node.children) {
            results.push(...findAllInTree(node.children as (TestRendererJSON | string)[], predicate));
        }
    }
    return results;
}

function collectAllText(nodes: (TestRendererJSON | string)[]): string[] {
    const texts: string[] = [];
    for (const node of nodes) {
        if (typeof node === 'string') {
            texts.push(node);
        } else if (node.children) {
            texts.push(...collectAllText(node.children as (TestRendererJSON | string)[]));
        }
    }
    return texts;
}

async function getTree(): Promise<(TestRendererJSON | string)[]> {
    await render(<LoginScreen />);
    const json = screen.toJSON();
    // Fragment returns an array, single root returns an object
    if (Array.isArray(json)) return json;
    if (json) return [json];
    return [];
}

describe('LoginScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the logo', async () => {
        const nodes = await getTree();
        const logos = findAllInTree(nodes, n => n.props?.testID === 'logo');
        expect(logos.length).toBe(1);
    });

    it('renders three text input fields with correct placeholders', async () => {
        const nodes = await getTree();
        const inputs = findAllInTree(nodes, n => n.type === 'TextInput');
        expect(inputs.length).toBe(3);

        const placeholders = inputs.map(n => n.props.placeholder);
        expect(placeholders).toContain('Username or email');
        expect(placeholders).toContain('Password');
        expect(placeholders).toContain('TOTP code (if enabled)');
    });

    it('renders a Login button with label text', async () => {
        const nodes = await getTree();
        const allText = collectAllText(nodes);
        expect(allText).toContain('Login');
    });

    it('renders password field with secureTextEntry', async () => {
        const nodes = await getTree();
        const inputs = findAllInTree(nodes, n => n.type === 'TextInput');
        const passwordInput = inputs.find(n => n.props.placeholder === 'Password');
        expect(passwordInput).toBeDefined();
        expect(passwordInput?.props.secureTextEntry).toBe(true);
    });

    it('renders username field with autoCapitalize none', async () => {
        const nodes = await getTree();
        const inputs = findAllInTree(nodes, n => n.type === 'TextInput');
        const usernameInput = inputs.find(n => n.props.placeholder === 'Username or email');
        expect(usernameInput).toBeDefined();
        expect(usernameInput?.props.autoCapitalize).toBe('none');
    });

    it('calls fetchApi and navigates on successful login', async () => {
        const mockFetchApi = fetchApi as jest.Mock;
        mockFetchApi.mockResolvedValueOnce({token: 'test-token-123'});
        (setAuthToken as jest.Mock).mockResolvedValueOnce(undefined);

        await render(<LoginScreen />);
        fireEvent.changeText(screen.getByPlaceholderText('Username or email'), 'testuser');
        fireEvent.changeText(screen.getByPlaceholderText('Password'), 'testpass');
        fireEvent.press(screen.getByText('Login'));

        await waitFor(() => {
            expect(mockFetchApi).toHaveBeenCalledWith(
                '/api2/authorize',
                expect.objectContaining({method: 'POST'}),
                {skipAuth: true},
            );
        });
        expect(displayMessage).toHaveBeenCalledWith(MessageSeverity.SUCCESS, 'Login successful');
        expect(setAuthToken).toHaveBeenCalledWith('test-token-123');
        expect(router.replace).toHaveBeenCalledWith('/main/Home');
    });

    it('shows error message on login failure', async () => {
        const mockFetchApi = fetchApi as jest.Mock;
        mockFetchApi.mockRejectedValueOnce(new Error('Invalid credentials'));

        await render(<LoginScreen />);
        fireEvent.changeText(screen.getByPlaceholderText('Username or email'), 'baduser');
        fireEvent.changeText(screen.getByPlaceholderText('Password'), 'badpass');
        fireEvent.press(screen.getByText('Login'));

        await waitFor(() => {
            expect(displayMessage).toHaveBeenCalledWith(MessageSeverity.ERROR, 'Invalid credentials');
        });
        expect(setAuthToken).not.toHaveBeenCalled();
        expect(router.replace).not.toHaveBeenCalled();
    });
});
