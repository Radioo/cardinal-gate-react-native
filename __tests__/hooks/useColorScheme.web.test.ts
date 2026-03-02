import React from 'react';
import renderer, {act} from 'react-test-renderer';
import {useColorScheme} from '@/hooks/useColorScheme.web';

function TestComponent({onResult}: {onResult: (scheme: string | null | undefined) => void}) {
    const colorScheme = useColorScheme();
    React.useEffect(() => {
        onResult(colorScheme);
    }, [colorScheme, onResult]);
    return React.createElement('Text', null, String(colorScheme));
}

describe('useColorScheme', () => {
    it('returns light initially before hydration', () => {
        let capturedScheme: string | null | undefined;
        act(() => {
            renderer.create(
                React.createElement(TestComponent, {
                    onResult: (scheme: string | null | undefined) => { capturedScheme = scheme; },
                })
            );
        });
        expect(capturedScheme).toBe('light');
    });

    it('is exported as a named function', () => {
        expect(typeof useColorScheme).toBe('function');
    });
});
