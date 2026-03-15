import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from '@/components/ui/select';

jest.mock('@rn-primitives/select', () => {
    const {createElement} = require('react');
    return {
        Root: ({children, ...props}: Record<string, unknown>) =>
            createElement('View', {testID: 'select-root', ...props}, children),
        Trigger: ({children, ...props}: Record<string, unknown>) =>
            createElement('View', {testID: 'select-trigger', ...props}, children),
        Value: (props: Record<string, unknown>) =>
            createElement('View', {testID: 'select-value', ...props}),
        Portal: ({children}: Record<string, unknown>) =>
            createElement('View', {testID: 'select-portal'}, children),
        Overlay: ({children, ...props}: Record<string, unknown>) =>
            createElement('View', {testID: 'select-overlay', ...props}, children),
        Content: ({children, ...props}: Record<string, unknown>) =>
            createElement('View', {testID: 'select-content', ...props}, children),
        Viewport: ({children, ...props}: Record<string, unknown>) =>
            createElement('View', {testID: 'select-viewport', ...props}, children),
        Item: ({children, ...props}: Record<string, unknown>) =>
            createElement('View', {testID: 'select-item', ...props}, children),
        ItemIndicator: ({children}: Record<string, unknown>) =>
            createElement('View', {testID: 'select-indicator'}, children),
        ItemText: (props: Record<string, unknown>) =>
            createElement('View', {testID: 'select-item-text', ...props}),
    };
});

jest.mock('lucide-react-native', () => ({
    ChevronDown: 'ChevronDown',
    Check: 'Check',
}));

describe('select exports', () => {
    it('exports all select components', () => {
        expect(Select).toBeDefined();
        expect(SelectTrigger).toBeDefined();
        expect(SelectValue).toBeDefined();
        expect(SelectContent).toBeDefined();
        expect(SelectItem).toBeDefined();
    });

    it('exports SelectTrigger as a function component', () => {
        expect(typeof SelectTrigger).toBe('function');
    });

    it('exports SelectContent as a function component', () => {
        expect(typeof SelectContent).toBe('function');
    });

    it('exports SelectItem as a function component', () => {
        expect(typeof SelectItem).toBe('function');
    });
});

describe('SelectTrigger', () => {
    it('renders children and chevron icon', async () => {
        await render(
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Pick one"/>
                </SelectTrigger>
            </Select>
        );
        expect(screen.getByTestId('select-trigger')).toBeTruthy();
        expect(screen.getByTestId('select-value')).toBeTruthy();
    });
});

describe('SelectContent', () => {
    it('renders portal with viewport and children', async () => {
        await render(
            <Select>
                <SelectContent>
                    <SelectItem value="a" label="Option A"/>
                </SelectContent>
            </Select>
        );
        expect(screen.getByTestId('select-portal')).toBeTruthy();
        expect(screen.getByTestId('select-viewport')).toBeTruthy();
        expect(screen.getByTestId('select-item')).toBeTruthy();
    });
});

describe('SelectItem', () => {
    it('renders item with indicator and text', async () => {
        await render(
            <Select>
                <SelectItem value="test" label="Test"/>
            </Select>
        );
        expect(screen.getByTestId('select-item')).toBeTruthy();
        expect(screen.getByTestId('select-indicator')).toBeTruthy();
        expect(screen.getByTestId('select-item-text')).toBeTruthy();
    });
});
