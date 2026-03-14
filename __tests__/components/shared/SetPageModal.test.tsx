import React from 'react';
import {render, screen} from '@testing-library/react-native';
import SetPageModal from '@/components/shared/SetPageModal';

jest.mock('react-native-safe-area-context', () => ({
    SafeAreaProvider: ({children}: {children: React.ReactNode}) => children,
}));

describe('SetPageModal', () => {
    it('renders without crashing', async () => {
        await render(
            <SetPageModal
                visible={true}
                onSubmit={jest.fn()}
                maxPage={10}
            />
        );
        expect(screen.toJSON()).toBeTruthy();
    });

    it('renders with initialValue', async () => {
        await render(
            <SetPageModal
                initialValue="5"
                visible={true}
                onSubmit={jest.fn()}
                maxPage={10}
            />
        );
        expect(screen.toJSON()).toBeTruthy();
    });
});
