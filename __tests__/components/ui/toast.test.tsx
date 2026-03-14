import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import {ToastItem} from '@/components/ui/toast';
import {MessageSeverity} from '@/enums/message-severity';

jest.mock('lucide-react-native', () => {
    const {createElement} = require('react');
    const Icon = (props: Record<string, unknown>) => createElement('View', props);
    return {CircleCheck: Icon, CircleX: Icon, X: Icon};
});

describe('ToastItem', () => {
    const defaultProps = {
        severity: MessageSeverity.SUCCESS,
        title: 'Success',
        description: 'Operation completed',
        onDismiss: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders title and description', async () => {
        await render(<ToastItem {...defaultProps} />);
        expect(screen.getByText('Success')).toBeTruthy();
        expect(screen.getByText('Operation completed')).toBeTruthy();
    });

    it('calls onDismiss when dismiss button is pressed', async () => {
        const onDismiss = jest.fn();
        await render(<ToastItem {...defaultProps} onDismiss={onDismiss} />);
        const dismissButtons = screen.root.findAll(
            (node: {props: Record<string, unknown>}) => node.props.onPress === onDismiss
        );
        expect(dismissButtons.length).toBeGreaterThan(0);
        fireEvent.press(dismissButtons[0]);
        expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    it('renders with error severity', async () => {
        await render(
            <ToastItem {...defaultProps} severity={MessageSeverity.ERROR} title="Error" />
        );
        expect(screen.getByText('Error')).toBeTruthy();
    });

    it('renders with success severity', async () => {
        await render(<ToastItem {...defaultProps} />);
        expect(screen.getByText('Success')).toBeTruthy();
    });
});
