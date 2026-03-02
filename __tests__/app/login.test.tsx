import React from 'react';
import renderer from 'react-test-renderer';

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

import LoginScreen from '@/app/login';

function findAllInTree(nodes: (renderer.ReactTestRendererJSON | string)[], predicate: (n: renderer.ReactTestRendererJSON) => boolean): renderer.ReactTestRendererJSON[] {
    const results: renderer.ReactTestRendererJSON[] = [];
    for (const node of nodes) {
        if (typeof node === 'string') continue;
        if (predicate(node)) results.push(node);
        if (node.children) {
            results.push(...findAllInTree(node.children as (renderer.ReactTestRendererJSON | string)[], predicate));
        }
    }
    return results;
}

function collectAllText(nodes: (renderer.ReactTestRendererJSON | string)[]): string[] {
    const texts: string[] = [];
    for (const node of nodes) {
        if (typeof node === 'string') {
            texts.push(node);
        } else if (node.children) {
            texts.push(...collectAllText(node.children as (renderer.ReactTestRendererJSON | string)[]));
        }
    }
    return texts;
}

function getTree(): (renderer.ReactTestRendererJSON | string)[] {
    const json = renderer.create(<LoginScreen />).toJSON();
    // Fragment returns an array, single root returns an object
    if (Array.isArray(json)) return json;
    if (json) return [json];
    return [];
}

describe('LoginScreen', () => {
    it('renders the logo', () => {
        const nodes = getTree();
        const logos = findAllInTree(nodes, n => n.props?.testID === 'logo');
        expect(logos.length).toBe(1);
    });

    it('renders three text input fields with correct placeholders', () => {
        const nodes = getTree();
        const inputs = findAllInTree(nodes, n => n.type === 'TextInput');
        expect(inputs.length).toBe(3);

        const placeholders = inputs.map(n => n.props.placeholder);
        expect(placeholders).toContain('Username or email');
        expect(placeholders).toContain('Password');
        expect(placeholders).toContain('TOTP code (if enabled)');
    });

    it('renders a Login button with label text', () => {
        const nodes = getTree();
        const allText = collectAllText(nodes);
        expect(allText).toContain('Login');
    });

    it('renders password field with secureTextEntry', () => {
        const nodes = getTree();
        const inputs = findAllInTree(nodes, n => n.type === 'TextInput');
        const passwordInput = inputs.find(n => n.props.placeholder === 'Password');
        expect(passwordInput).toBeDefined();
        expect(passwordInput?.props.secureTextEntry).toBe(true);
    });

    it('renders username field with autoCapitalize none', () => {
        const nodes = getTree();
        const inputs = findAllInTree(nodes, n => n.type === 'TextInput');
        const usernameInput = inputs.find(n => n.props.placeholder === 'Username or email');
        expect(usernameInput).toBeDefined();
        expect(usernameInput?.props.autoCapitalize).toBe('none');
    });
});
