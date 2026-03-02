import React from 'react';
import renderer, {act} from 'react-test-renderer';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import ShareImageModal from '@/components/shared/ShareImageModal';

jest.mock('expo-sharing', () => ({isAvailableAsync: jest.fn().mockResolvedValue(true), shareAsync: jest.fn()}));
jest.mock('expo-file-system', () => ({cacheDirectory: '/tmp/', EncodingType: {Base64: 'base64'}, writeAsStringAsync: jest.fn()}));
jest.mock('@/services/image', () => ({downloadToLocalFile: jest.fn().mockResolvedValue('/tmp/scorecard.png')}));

jest.mock('@/components/shared/ApiImage', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', {testID: 'api-image', ...props})};
});

jest.mock('@/components/shared/ModalBase', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: ({children, visible}: {children: React.ReactNode; visible: boolean}) => visible ? createElement('View', {testID: 'modal'}, children) : null};
});

jest.mock('@/components/themed/ThemedCheckbox', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', {testID: 'checkbox', ...props})};
});

jest.mock('@/components/themed/ThemedButton', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: (props: Record<string, unknown>) => createElement('View', {testID: `btn-${props.label}`, ...props})};
});

jest.mock('@/components/themed/ThemedText', () => {
    const {createElement} = require('react');
    return {__esModule: true, default: ({children}: {children: React.ReactNode}) => createElement('View', null, children)};
});

async function renderModal(client: QueryClient, props: {url: string; visible: boolean; onClose: () => void}) {
    let tree: renderer.ReactTestRenderer = undefined as unknown as renderer.ReactTestRenderer;
    await act(async () => {
        tree = renderer.create(
            <QueryClientProvider client={client}>
                <ShareImageModal {...props} />
            </QueryClientProvider>
        );
    });
    return tree;
}

describe('ShareImageModal', () => {
    let client: QueryClient;

    beforeEach(() => {
        client = new QueryClient({defaultOptions: {queries: {retry: false}}});
        client.setQueryData(['sharingAvailable'], true);
    });

    afterEach(() => {
        client.clear();
    });

    it('renders nothing when visible is false', async () => {
        const tree = await renderModal(client, {url: 'https://example.com/image.png', visible: false, onClose: jest.fn()});
        expect(tree.toJSON()).toBeNull();
        tree.unmount();
    });

    it('renders modal with ApiImage when visible', async () => {
        const tree = await renderModal(client, {url: 'https://example.com/image.png', visible: true, onClose: jest.fn()});
        const root = tree.root;
        expect(root.findAllByProps({testID: 'modal'})).toHaveLength(1);
        const apiImage = root.findByProps({testID: 'api-image'});
        expect(apiImage.props.url).toBe('https://example.com/image.png');
        expect(apiImage.props.contentFit).toBe('contain');
        tree.unmount();
    });

    it('renders Share and Close buttons', async () => {
        const tree = await renderModal(client, {url: 'https://example.com/image.png', visible: true, onClose: jest.fn()});
        const root = tree.root;
        expect(root.findByProps({testID: 'btn-Share'})).toBeTruthy();
        expect(root.findByProps({testID: 'btn-Close'})).toBeTruthy();
        tree.unmount();
    });

    it('Share button is initially disabled', async () => {
        const tree = await renderModal(client, {url: 'https://example.com/image.png', visible: true, onClose: jest.fn()});
        const shareBtn = tree.root.findByProps({testID: 'btn-Share'});
        expect(shareBtn.props.disabled).toBe(true);
        tree.unmount();
    });

    it('calls onClose when Close button is pressed', async () => {
        const onClose = jest.fn();
        const tree = await renderModal(client, {url: 'https://example.com/image.png', visible: true, onClose});
        const closeBtn = tree.root.findByProps({testID: 'btn-Close'});
        closeBtn.props.onPress();
        expect(onClose).toHaveBeenCalled();
        tree.unmount();
    });

    it('renders checkbox with sharing warning text', async () => {
        const tree = await renderModal(client, {url: 'https://example.com/image.png', visible: true, onClose: jest.fn()});
        const json = JSON.stringify(tree.toJSON());
        expect(json).toContain('sharing this image in public');
        expect(tree.root.findAllByProps({testID: 'checkbox'})).toHaveLength(1);
        tree.unmount();
    });
});
