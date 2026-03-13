import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
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

async function renderModal(client: QueryClient, props: {url: string; visible: boolean; onClose: () => void}) {
    await render(
        <QueryClientProvider client={client}>
            <ShareImageModal {...props} />
        </QueryClientProvider>
    );
}

describe('ShareImageModal', () => {
    let client: QueryClient;

    beforeEach(() => {
        client = new QueryClient({defaultOptions: {queries: {retry: false, gcTime: 0}}});
        client.setQueryData(['sharingAvailable'], true);
    });

    afterEach(() => {
        client.clear();
    });

    it('renders nothing when visible is false', async () => {
        await renderModal(client, {url: 'https://example.com/image.png', visible: false, onClose: jest.fn()});
        expect(screen.toJSON()).toBeNull();
    });

    it('renders modal with ApiImage when visible', async () => {
        await renderModal(client, {url: 'https://example.com/image.png', visible: true, onClose: jest.fn()});
        expect(screen.getAllByTestId('modal')).toHaveLength(1);
        const apiImage = screen.getByTestId('api-image');
        expect(apiImage.props.url).toBe('https://example.com/image.png');
        expect(apiImage.props.contentFit).toBe('contain');
    });

    it('renders Share and Close buttons', async () => {
        await renderModal(client, {url: 'https://example.com/image.png', visible: true, onClose: jest.fn()});
        expect(screen.getByText('Share')).toBeTruthy();
        expect(screen.getByText('Close')).toBeTruthy();
    });

    it('calls onClose when Close button is pressed', async () => {
        const onClose = jest.fn();
        await renderModal(client, {url: 'https://example.com/image.png', visible: true, onClose});
        fireEvent.press(screen.getByText('Close'));
        expect(onClose).toHaveBeenCalled();
    });

    it('renders checkbox with sharing warning text', async () => {
        await renderModal(client, {url: 'https://example.com/image.png', visible: true, onClose: jest.fn()});
        const json = JSON.stringify(screen.toJSON());
        expect(json).toContain('sharing this image in public');
    });
});
