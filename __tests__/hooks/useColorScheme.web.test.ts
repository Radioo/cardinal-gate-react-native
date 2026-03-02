import React from 'react';
import {render} from '@testing-library/react-native';
import {useColorScheme} from '@/hooks/useColorScheme.web';

function TestComponent({onResult}: {onResult: (scheme: string | null | undefined) => void}) {
    const colorScheme = useColorScheme();
    React.useEffect(() => {
        onResult(colorScheme);
    }, [colorScheme, onResult]);
    return React.createElement('Text', null, String(colorScheme));
}

describe('useColorScheme', () => {
    it('returns light initially before hydration', async () => {
        let capturedScheme: string | null | undefined;
        await render(
            React.createElement(TestComponent, {
                onResult: (scheme: string | null | undefined) => { capturedScheme = scheme; },
            })
        );
        expect(capturedScheme).toBe('light');
    });

    it('is exported as a named function', async () => {
        expect(typeof useColorScheme).toBe('function');
    });
});
