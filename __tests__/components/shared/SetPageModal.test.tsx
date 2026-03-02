import React from 'react';
import renderer from 'react-test-renderer';
import SetPageModal from '@/components/shared/SetPageModal';

jest.mock('expo-blur', () => ({
    BlurView: 'BlurView',
}));

jest.mock('react-native-safe-area-context', () => ({
    SafeAreaProvider: ({children}: {children: React.ReactNode}) => children,
}));

describe('SetPageModal', () => {
    it('renders without crashing', () => {
        const tree = renderer.create(
            <SetPageModal
                visible={true}
                onClose={jest.fn()}
                maxPage={10}
            />
        ).toJSON();
        expect(tree).toBeTruthy();
    });

    it('renders with initialValue', () => {
        const tree = renderer.create(
            <SetPageModal
                initialValue="5"
                visible={true}
                onClose={jest.fn()}
                maxPage={10}
            />
        ).toJSON();
        expect(tree).toBeTruthy();
    });
});
