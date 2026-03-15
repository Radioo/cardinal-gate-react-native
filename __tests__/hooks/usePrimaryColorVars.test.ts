import React from 'react';
import {render} from '@testing-library/react-native';
import usePrimaryColorVars from '@/hooks/usePrimaryColorVars';

function TestComponent({onResult}: {onResult: (vars: Record<string, string>) => void}) {
    const vars = usePrimaryColorVars();
    React.useEffect(() => {
        onResult(vars as unknown as Record<string, string>);
    }, [vars, onResult]);
    return React.createElement('View');
}

describe('usePrimaryColorVars', () => {
    it('returns an object with CSS variable styles', async () => {
        let capturedVars: Record<string, string> | null = null;
        await render(
            React.createElement(TestComponent, {
                onResult: (vars: Record<string, string>) => { capturedVars = vars; },
            })
        );
        expect(capturedVars).toBeTruthy();
        expect(typeof capturedVars).toBe('object');
    });

    it('is exported as a default function', () => {
        expect(typeof usePrimaryColorVars).toBe('function');
    });
});
