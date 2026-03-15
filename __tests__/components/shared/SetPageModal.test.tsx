import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import SetPageModal from '@/components/shared/SetPageModal';

jest.mock('react-native-safe-area-context', () => ({
    SafeAreaProvider: ({children}: {children: React.ReactNode}) => children,
}));

jest.mock('@rn-primitives/dialog', () => {
    const {createElement} = require('react');
    return {
        Root: ({children, ...props}: Record<string, unknown>) =>
            createElement('View', props, children),
        Overlay: ({children}: Record<string, unknown>) =>
            createElement('View', null, children),
        Portal: ({children}: Record<string, unknown>) =>
            createElement('View', null, children),
        Content: ({children, ...props}: Record<string, unknown>) =>
            createElement('View', props, children),
        Title: (props: Record<string, unknown>) =>
            createElement('View', props),
    };
});

describe('SetPageModal', () => {
    it('renders title text', async () => {
        await render(
            <SetPageModal visible={true} onSubmit={jest.fn()} maxPage={10}/>
        );
        expect(screen.getByText('Set page')).toBeTruthy();
    });

    it('renders OK button', async () => {
        await render(
            <SetPageModal visible={true} onSubmit={jest.fn()} maxPage={10}/>
        );
        expect(screen.getByText('OK')).toBeTruthy();
    });

    it('pre-populates input with initialValue', async () => {
        await render(
            <SetPageModal initialValue="5" visible={true} onSubmit={jest.fn()} maxPage={10}/>
        );
        expect(screen.getByDisplayValue('5')).toBeTruthy();
    });

    it('defaults input to "1" when no initialValue', async () => {
        await render(
            <SetPageModal visible={true} onSubmit={jest.fn()} maxPage={10}/>
        );
        expect(screen.getByDisplayValue('1')).toBeTruthy();
    });

    it('calls onSubmit with parsed page number on OK press', async () => {
        const onSubmit = jest.fn();
        await render(
            <SetPageModal initialValue="3" visible={true} onSubmit={onSubmit} maxPage={10}/>
        );
        fireEvent.press(screen.getByText('OK'));
        expect(onSubmit).toHaveBeenCalledWith(3);
    });

    it('clamps page to maxPage when input exceeds it', async () => {
        const onSubmit = jest.fn();
        await render(
            <SetPageModal visible={true} onSubmit={onSubmit} maxPage={5}/>
        );
        fireEvent.changeText(screen.getByDisplayValue('1'), '999');
        fireEvent.press(screen.getByText('OK'));
        expect(onSubmit).toHaveBeenCalledWith(5);
    });

    it('clamps page to 1 for invalid input', async () => {
        const onSubmit = jest.fn();
        await render(
            <SetPageModal visible={true} onSubmit={onSubmit} maxPage={10}/>
        );
        fireEvent.changeText(screen.getByDisplayValue('1'), 'abc');
        fireEvent.press(screen.getByText('OK'));
        expect(onSubmit).toHaveBeenCalledWith(1);
    });
});
