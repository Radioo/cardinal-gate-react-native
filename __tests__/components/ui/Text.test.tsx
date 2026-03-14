import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {Text, TextClassContext} from '@/components/ui/text';

describe('Text', () => {
    it('renders children text', async () => {
        await render(<Text>Hello World</Text>);
        expect(screen.getByText('Hello World')).toBeTruthy();
    });

    it('applies heading role for h1 variant', async () => {
        await render(<Text variant="h1">Heading</Text>);
        const el = screen.getByText('Heading');
        expect(el.props.role).toBe('heading');
        expect(el.props['aria-level']).toBe('1');
    });

    it('applies heading role for h2 variant', async () => {
        await render(<Text variant="h2">Sub Heading</Text>);
        const el = screen.getByText('Sub Heading');
        expect(el.props.role).toBe('heading');
        expect(el.props['aria-level']).toBe('2');
    });

    it('applies no role for default variant', async () => {
        await render(<Text>Default</Text>);
        const el = screen.getByText('Default');
        expect(el.props.role).toBeUndefined();
    });

    it('applies context class from TextClassContext', async () => {
        await render(
            <TextClassContext.Provider value="text-primary">
                <Text>Styled</Text>
            </TextClassContext.Provider>
        );
        expect(screen.getByText('Styled')).toBeTruthy();
    });

    it('renders muted variant', async () => {
        await render(<Text variant="muted">Muted text</Text>);
        expect(screen.getByText('Muted text')).toBeTruthy();
    });
});
