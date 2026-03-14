import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {Checkbox} from '@/components/ui/checkbox';

jest.mock('lucide-react-native', () => {
    const {createElement} = require('react');
    return {
        Check: (props: Record<string, unknown>) => createElement('View', props),
    };
});

jest.mock('@rn-primitives/checkbox', () => {
    const {createElement, forwardRef} = require('react');
    return {
        Root: forwardRef(({children, ...props}: {children?: React.ReactNode; onCheckedChange?: (val: boolean) => void; checked?: boolean; disabled?: boolean; className?: string; hitSlop?: number}, ref: React.Ref<unknown>) =>
            createElement('View', {testID: 'checkbox-root', ref, accessibilityRole: 'checkbox', ...props}, children)),
        Indicator: ({children, ...props}: {children?: React.ReactNode; className?: string}) =>
            createElement('View', {testID: 'checkbox-indicator', ...props}, children),
    };
});

const noop = () => {};

describe('Checkbox', () => {
    it('renders unchecked state', async () => {
        await render(<Checkbox checked={false} onCheckedChange={noop} />);
        const root = screen.getByTestId('checkbox-root');
        expect(root.props.checked).toBe(false);
    });

    it('renders checked state', async () => {
        await render(<Checkbox checked={true} onCheckedChange={noop} />);
        const root = screen.getByTestId('checkbox-root');
        expect(root.props.checked).toBe(true);
    });

    it('renders disabled state', async () => {
        await render(<Checkbox checked={false} onCheckedChange={noop} disabled={true} />);
        const root = screen.getByTestId('checkbox-root');
        expect(root.props.disabled).toBe(true);
    });

    it('fires onCheckedChange callback', async () => {
        const onChange = jest.fn();
        await render(<Checkbox checked={false} onCheckedChange={onChange} />);
        const root = screen.getByTestId('checkbox-root');
        root.props.onCheckedChange(true);
        expect(onChange).toHaveBeenCalledWith(true);
    });

    it('renders indicator', async () => {
        await render(<Checkbox checked={true} onCheckedChange={noop} />);
        expect(screen.getByTestId('checkbox-indicator')).toBeTruthy();
    });
});
